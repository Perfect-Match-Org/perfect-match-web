import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";

/**
 * This module manages the connection to the MongoDB database.
 * It uses a global cache to store the connection and reuse it on subsequent calls,
 * which avoids the overhead of establishing a new connection with each request.
 */

type MongooseCache = {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
    hasLoggedOptions: boolean;
    hasLoggedInstance: boolean;
};

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri || mongoUri.trim() === "") {
    throw new Error("Missing required environment variable: MONGODB_URI");
}
const MONGODB_URI: string = mongoUri;

const globalWithMongoose = globalThis as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose ?? {
    connection: null,
    promise: null,
    hasLoggedOptions: false,
    hasLoggedInstance: false,
};
globalWithMongoose.mongoose = cached;

/**
 * Parses a positive integer environment variable.
 * Returns the provided fallback when missing/invalid.
 */
function getPositiveIntegerEnv(name: string, fallback: number): number {
    const rawValue = process.env[name];
    if (!rawValue) {
        return fallback;
    }

    const parsedValue = Number.parseInt(rawValue, 10);
    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
        return fallback;
    }

    return parsedValue;
}

/**
 * Builds a fresh mongoose connection promise.
 * If the handshake fails (including transient TLS errors), the cached promise
 * is cleared so the next request can retry instead of reusing a rejected promise.
 */
function createConnectionPromise(): Promise<Mongoose> {
    // Serverless instances can scale horizontally fast, so keep per-instance pools small.
    const maxPoolSize = getPositiveIntegerEnv("MONGODB_MAX_POOL_SIZE", 3);
    const minPoolSize = getPositiveIntegerEnv("MONGODB_MIN_POOL_SIZE", 0);
    const maxIdleTimeMS = getPositiveIntegerEnv("MONGODB_MAX_IDLE_TIME_MS", 15000);
    const waitQueueTimeoutMS = getPositiveIntegerEnv("MONGODB_WAIT_QUEUE_TIMEOUT_MS", 5000);

    const options: ConnectOptions = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize,
        minPoolSize,
        maxIdleTimeMS,
        waitQueueTimeoutMS,
    };

    if (!cached.hasLoggedOptions) {
        console.info(
            JSON.stringify({
                scope: "database.connect.config",
                maxPoolSize,
                minPoolSize,
                maxIdleTimeMS,
                waitQueueTimeoutMS,
                serverSelectionTimeoutMS: options.serverSelectionTimeoutMS,
                socketTimeoutMS: options.socketTimeoutMS,
            }),
        );
        cached.hasLoggedOptions = true;
    }

    mongoose.set("strictQuery", false);

    return mongoose.connect(MONGODB_URI, options).catch((error: unknown) => {
        cached.promise = null;
        throw error;
    });
}

/**
 * Indicates whether mongoose currently has an active driver connection.
 */
function isMongooseConnected(): boolean {
    return mongoose.connection.readyState === 1;
}

/**
 * Establishes or retrieves a cached MongoDB connection.
 * Caches the connection promise to prevent duplicate connections
 * from concurrent requests during serverless cold starts.
 *
 * @returns {Promise<mongoose.Connection>} The MongoDB connection object.
 */
export async function connect() {
    if (!cached.hasLoggedInstance) {
        console.info(
            JSON.stringify({
                scope: "database.connect.instance",
                pid: process.pid,
            }),
        );
        cached.hasLoggedInstance = true;
    }

    // Reuse active mongoose connection even if cache object was recreated.
    if (cached.connection && isMongooseConnected()) {
        return cached.connection;
    }

    if (isMongooseConnected()) {
        cached.connection = mongoose;
        cached.promise = Promise.resolve(mongoose);
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
