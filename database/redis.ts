// @ts-nocheck
import * as redis from "redis";

let redisClient: any;

if (process.env.NODE_ENV !== "development" || !global.redisClient) {
  console.log("Creating redis client");
  redisClient = redis.createClient({ url: process.env.REDIS_URL });
  redisClient.connect();
  if (process.env.NODE_ENV === "development") global.redisClient = redisClient;
} else {
  console.log("Using existing redis client");
  redisClient = global.redisClient;
}

export { redisClient };
