import parsedFile from '../models/file';
import dbClient from '../utils/db';
import { getFile } from '../utils/objectSerializer';
import validate from '../utils/validator';

// eslint-disable-next-line import/prefer-default-export
export const postUpload = async (req, res) => {
  try {
    await validate.file(req.body);

    const file = parsedFile(req.body, req.user._id);
    const fileDoc = await dbClient.createDocument('files', file);
    const fileDto = getFile(fileDoc);
    return res.status(201).send(fileDto);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
