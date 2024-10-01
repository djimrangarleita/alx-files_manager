import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const getStatus = async (req, res) => {
  try {
    const redis = redisClient.isAlive();
    const db = await dbClient.isAlive();
    res.send({ redis, db });
  } catch (error) {
    res.status(500).send({ message: `Request failed: ${error}` });
  }
};

export const getStats = async (req, res) => {
  try {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.send({ users, files });
  } catch (error) {
    res.status(500).send({ message: `Request failed: ${error}` });
  }
};
