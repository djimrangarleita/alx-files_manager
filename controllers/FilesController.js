import parsedFile from '../models/file';
import dbClient from '../utils/db';
import { getFile } from '../utils/objectSerializer';
import uploadFile from '../utils/uploadFile';
import validate from '../utils/validator';

// eslint-disable-next-line import/prefer-default-export
export const postUpload = async (req, res) => {
  try {
    const fileData = req.body;
    await validate.file(fileData);

    const filePath = uploadFile(fileData.data);

    const file = parsedFile(fileData, req.user._id, filePath);

    const fileDoc = await dbClient.createDocument('files', file);

    const fileDto = getFile(fileDoc);

    return res.status(201).send(fileDto);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
