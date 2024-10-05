import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const getStatus = async (req, res) => {
  try {
    const redis = redisClient.isAlive();
    const db = await dbClient.isAlive();
    return res.send({ redis, db });
  } catch (error) {
    return res.status(500).send({ message: `Request failed: ${error}` });
  }
};

export const getStats = async (req, res) => {
  try {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    return res.send({ users, files });
  } catch (error) {
    return res.status(500).send({ message: `Request failed: ${error}` });
  }
};
