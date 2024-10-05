import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';

const uploadFile = (data) => {
  if (!data) {
    return null;
  }
  const absPath = path.resolve(config.folderPath);
  const filePath = path.join(absPath, uuidv4());
  fs.mkdir(absPath, { recursive: true }, (err) => {
    if (err) {
      if (err.message !== 'EEXIST') {
        throw err;
      }
    }
  });

  fs.writeFile(filePath, data, { encoding: 'base64' }, (err) => {
    if (err) {
      throw err;
    }
  });

  return filePath;
};

export default uploadFile;
