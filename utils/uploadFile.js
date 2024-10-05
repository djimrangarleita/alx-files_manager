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
  try {
    fs.mkdirSync(absPath, { recursive: true });
  } catch (error) {
    console.error(error.message);
    if (error.message !== 'EEXIST') {
      throw error;
    }
  }

  fs.writeFileSync(filePath, data, { encoding: 'base64' });

  return filePath;
};

export default uploadFile;
