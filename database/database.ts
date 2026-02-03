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
    cached = global.mongoose = { connection: null, promise: null };
}

/**
 * Establishes or retrieves a cached MongoDB connection.
 * Caches the connection promise to prevent duplicate connections
 * from concurrent requests during serverless cold starts.
 *
 * @returns {Promise<mongoose.Connection>} The MongoDB connection object.
 */
export async function connect() {
    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        const opts: MongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        };
        mongoose.set('strictQuery', false);
        cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    cached.connection = await cached.promise;
    return cached.connection;
}
