// @ts-nocheck
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null };
}

export async function connect() {
  if (cached.connection) {
    console.log("Found connection in cache!");
    return cached.connection;
  }
  console.log("Initiating new connection...");
  const opts: MongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  };
  cached.connection = await mongoose
    .connect(MONGODB_URI, opts)
    .then((mongoose) => mongoose);
  console.log("Connected to MongoDB!");
  return cached.connection;
}
