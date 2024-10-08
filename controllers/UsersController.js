import sha1 from 'sha1';
import dbClient from '../utils/db';
import { getUser } from '../utils/objectSerializer';
import validate from '../utils/validator';

export const postNew = async (req, res) => {
  try {
    validate.user(req.body);

    const { email, password } = req.body;
    const user = await dbClient.createDocument('users', { email, password: sha1(password) });

    return res.status(201).send(getUser(user));
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export const getMe = async (req, res) => {
  const { user } = req;
  return res.send(getUser(user));
};
