import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SensorData from '../backend/models/SensorData.js';
import SensorDataArchive from './models/SensorDataArchive.js';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(cors());

// WebSocket Server for frontend clients
const wss = new WebSocketServer({ server });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

const ESP_URL = 'ws://Your_esp_IP:81/';
let espSocket;
let reconnectInterval = 5000; // 5 seconds retry interval

function connectToESP() {
  console.log("Attempting to connect to ESP8266 WebSocket...");
  espSocket = new WebSocket(ESP_URL);

  espSocket.onopen = () => {
    console.log('Connected to ESP8266 WebSocket');
  };

  espSocket.onmessage = async (event) => {
    try {
      console.log("Received from ESP8266:", event.data);
      const sensorData = JSON.parse(event.data);
      const newData = new SensorData(sensorData);
      await newData.save();
      console.log("Data Saved to MongoDB");

      // Send data to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(sensorData));
        }
      });
    } catch (error) {
      console.error('Error processing ESP WebSocket data:', error);
    }
  };

  espSocket.onerror = (error) => {
    console.error("ESP WebSocket Error:", error);
  };

  espSocket.onclose = () => {
    console.log("ESP WebSocket Disconnected. Reconnecting in 5 seconds...");
    setTimeout(connectToESP, reconnectInterval);
  };
}

// Start the connection
connectToESP();

// Function to archive data every 1 hour
const archiveData = async () => {
  try {
    const allData = await SensorData.find();
    if (allData.length > 0) {
      const archiveRecords = allData.map(data => ({
        temperature: data.temperature,
        humidity: data.humidity,
        soil_moisture: data.soil_moisture,
        motion: data.motion,
        threshold: data.threshold,
        battery: data.battery,
        timestamp: data.timestamp
      }));

      await SensorDataArchive.insertMany(archiveRecords, { ordered: false }).catch(err => {
        console.error("Duplicate Error Skipped:", err);
      });
      console.log("Sensor data archived successfully");

      // Delete only archived records
      await SensorData.deleteMany({ _id: { $in: allData.map(d => d._id) } });
    }
  } catch (error) {
    console.error("Error archiving data:", error);
  }
};
setInterval(archiveData, 60 * 60 * 1000); // Run every 1 hour 

// WebSocket for frontend clients
wss.on('connection', (ws) => {
  console.log('Frontend WebSocket Connected');

  ws.on('close', () => {
    console.log('Frontend WebSocket Disconnected');
  });
});

// API Route to fetch sensor data
app.get('/api/sensordata/archive', async (req, res) => {
  try {
    const archivedData = await SensorDataArchive.find().sort({ timestamp: -1 }); // Sort by latest first
    res.json(archivedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching archived sensor data", error });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));