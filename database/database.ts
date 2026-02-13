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
const MAX_CONNECT_ATTEMPTS = 4;
const RETRY_BACKOFF_MS = 750;

/**
 * Converts an unknown error into a consistent, log-safe structure.
 * This avoids `any` usage while preserving useful diagnostics for production.
 */
function normalizeError(error: unknown): { name: string; message: string; stack?: string } {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }

    return {
        name: "UnknownError",
        message: typeof error === "string" ? error : "Unknown connection error",
    };
}

/**
 * Returns true when an error message suggests a temporary network/TLS issue.
 * These cases are safe to retry once with a short delay.
 */
function isTransientMongoError(error: unknown): boolean {
    const normalizedError = normalizeError(error);
    const message = normalizedError.message.toLowerCase();
    const name = normalizedError.name.toLowerCase();

    const transientSignals = [
        "mongonetworkerror",
        "tls",
        "ssl",
        "econnreset",
        "etimedout",
        "timed out",
        "connection closed",
        "server selection",
    ];

    return transientSignals.some((signal) => name.includes(signal) || message.includes(signal));
}

/**
 * Small async delay helper used for retry backoff.
 */
function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

/**
 * Emits structured logs for MongoDB connection attempts.
 * The payload is JSON so production log processing tools can parse fields.
 */
function logMongoAttempt(level: "warn" | "error", context: { attempt: number; maxAttempts: number; willRetry: boolean; error: unknown }): void {
    const normalizedError = normalizeError(context.error);
    const payload = {
        scope: "database.connect",
        attempt: context.attempt,
        maxAttempts: context.maxAttempts,
        willRetry: context.willRetry,
        errorName: normalizedError.name,
        errorMessage: normalizedError.message,
        errorStack: normalizedError.stack,
    };

    const serializedPayload = JSON.stringify(payload);
    if (level === "warn") {
        console.warn(serializedPayload);
        return;
    }

    console.error(serializedPayload);
}

/**
 * Connects to MongoDB with one retry for transient TLS/network failures.
 */
async function connectWithRetry(options: ConnectOptions): Promise<Mongoose> {
    for (let attempt = 1; attempt <= MAX_CONNECT_ATTEMPTS; attempt += 1) {
        try {
            return await mongoose.connect(MONGODB_URI, options);
        } catch (error) {
            const shouldRetry = attempt < MAX_CONNECT_ATTEMPTS && isTransientMongoError(error);
            logMongoAttempt(shouldRetry ? "warn" : "error", {
                attempt,
                maxAttempts: MAX_CONNECT_ATTEMPTS,
                willRetry: shouldRetry,
                error,
            });

            if (!shouldRetry) {
                throw error;
            }

            await wait(RETRY_BACKOFF_MS);
        }
    }

    throw new Error("MongoDB connection failed after retry attempts");
}

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

    return connectWithRetry(options).catch((error: unknown) => {
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
