import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";

/**
 * This module manages the connection to the MongoDB database.
 * It uses a global cache to store the connection and reuse it on subsequent calls,
 * which avoids the overhead of establishing a new connection with each request.
 */

type MongooseCache = {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
};

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri || mongoUri.trim() === "") {
    throw new Error("Missing required environment variable: MONGODB_URI");
}
const MONGODB_URI: string = mongoUri;

const globalWithMongoose = globalThis as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose ?? { connection: null, promise: null };
globalWithMongoose.mongoose = cached;

/**
 * Builds a fresh mongoose connection promise.
 * If the handshake fails (including transient TLS errors), the cached promise
 * is cleared so the next request can retry instead of reusing a rejected promise.
 */
function createConnectionPromise(): Promise<Mongoose> {
    const options: ConnectOptions = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 1,
    };

    mongoose.set("strictQuery", false);

    return mongoose.connect(MONGODB_URI, options).catch((error: unknown) => {
        cached.promise = null;
        throw error;
    });
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
        cached.promise = createConnectionPromise();
    }

    try {
        cached.connection = await cached.promise;
        return cached.connection;
    } catch (error) {
        cached.promise = null;
        cached.connection = null;
        throw error;
    }
}
