import sha1 from 'sha1';
import dbClient from '../utils/db';
import { getUser } from '../utils/objectSerializer';
import { validateUser } from '../utils/validator';

// eslint-disable-next-line import/prefer-default-export
export const postNew = async (req, res) => {
  try {
    validateUser(req.body);

    const { email, password } = req.body;
    const user = await dbClient.createDocument('users', { email, password: sha1(password) });

    return res.status(201).send(getUser(user));
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
