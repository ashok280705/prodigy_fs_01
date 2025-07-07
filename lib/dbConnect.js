import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("Mongo URI not found");

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};