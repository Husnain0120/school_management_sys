// lib/dbConnect.js
import mongoose from "mongoose";

// Local MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your DB name
console.log(MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Use global cache to persist the connection in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      cached.conn = await cached.promise;
      console.log("✅ MongoDB connected successfully");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      throw new Error("MongoDB connection failed");
    }
  }

  return cached.conn;
}

export default dbConnect;
