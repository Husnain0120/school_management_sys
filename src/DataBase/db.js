import mongoose from "mongoose";

let isConnected = false; // Use a simple boolean flag

const dbConnect = async () => {
  if (isConnected) {
    console.log("✅ Already connected to the database.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default dbConnect;
