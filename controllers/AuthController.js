import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const getConnect = async (req, res) => {
  try {
    const { email, password } = req.auth_credentials;
    const { _id } = await dbClient.findUserOrThrow({ email, password: sha1(password) });
    const token = uuidv4();
    await redisClient.set(`auth_${token}`, _id, config.authTokenTtl);
    return res.send({ token });
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export const getDisconnect = async (req, res) => {
  const token = req.headers['x-token'];
  await redisClient.del(`auth_${token}`);
  res.status(204).send();
};
