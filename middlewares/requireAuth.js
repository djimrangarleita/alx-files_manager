import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers['x-token'];
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const user = await dbClient.getDocumentByKV('users', '_id', ObjectId(userId));
    if (!user) {
      throw new Error('Unauthorized');
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export default requireAuth;
