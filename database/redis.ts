const redis = require("redis");

console.log(process.env.REDIS_HOST);
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err: string) => {
  console.log(`Error: ${err}`);
});

export default client;
