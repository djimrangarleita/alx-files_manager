import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    if (!RedisClient.instance) {
      this.client = redis.createClient();
      this.client.on('error', (error) => {
        console.log(`${error}`);
      });
      RedisClient.instance = this;
    }
    return RedisClient.instance;
  }

  isAlive() {
    return new Promise((resolve, reject) => {
      this.client.ping((err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply === 'PONG');
      });
    });
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    const response = await setAsync(key, value, 'EX', duration);
    return response;
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    const response = await delAsync(key);
    return response;
  }
}

const redisClient = new RedisClient();

export default redisClient;
