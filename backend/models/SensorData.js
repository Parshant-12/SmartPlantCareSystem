import mongoose from 'mongoose';

const SensorDataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  soil_moisture: Number,
  motion: Number,
  threshold: Number,
  battery:Number,
  timestamp: { type: Date, default: Date.now, expires: '1d' } // Expires in 1 day
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);
export default SensorData;
