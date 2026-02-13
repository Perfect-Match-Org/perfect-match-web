// @ts-nocheck
import mongoose from 'mongoose';

/**
 * This module manages the connection to the MongoDB database.
 * It uses a global cache to store the connection and reuse it on subsequent calls,
 * which avoids the overhead of establishing a new connection with each request.
 */

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { connection: null };
}

/**
 * Establishes or retrieves a cached MongoDB connection.
 * If the connection is already cached, it returns that instead of creating a new one.
 *
 * @returns {Promise<mongoose.Connection>} The MongoDB connection object.
 */
export async function connect() {
    if (cached.connection) {
        console.log('Found connection in cache!');
        return cached.connection;
    }
    console.log('Initiating new connection...');
    const opts: MongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
    };
    mongoose.set('strictQuery', false);
    cached.connection = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
    console.log('Connected to MongoDB!');
    return cached.connection;
}