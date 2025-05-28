// src/redis/redis.client.ts
import { createClient } from 'redis';
import { config } from 'dotenv';

config();

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

redis.connect();
