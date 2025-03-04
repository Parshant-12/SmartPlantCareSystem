import mongoose from "mongoose";

const SensorDataArchiveSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  soil_moisture: Number,
  motion: Number,
  threshold: Number,
  battery:Number,
  timestamp: { type: Date, default: Date.now }
});

const SensorDataArchive = mongoose.model("SensorDataArchive", SensorDataArchiveSchema);

export default SensorDataArchive;