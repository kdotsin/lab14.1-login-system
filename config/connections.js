import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

export async function connectDB(URI) {
  try {
    await mongoose.connect();
    console.log('successfully connected to mongoDB');
  } catch {
    console.error('failed to connect to mongoDB', err);
  }
}