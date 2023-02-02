const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

client.on('ready', () => {
    console.log('Redis client is ready');
});

module.exports = client;
