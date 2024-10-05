import { ObjectId } from 'mongodb';
import dbClient from './db';

const user = (doc) => {
  if (!doc) {
    throw new Error('Missing email');
  }

  const { email, password } = doc;

  if (!email) {
    throw new Error('Missing email');
  }

  if (!password) {
    throw new Error('Missing password');
  }
};

const file = async (uploadedFile) => {
  const acceptedTypes = ['file', 'folder', 'image'];
  const {
    name, type, data, parentId, isPublic,
  } = uploadedFile;
  if (!name) {
    throw new Error('Missing name');
  }

  if (!type || !acceptedTypes.includes(type)) {
    throw new Error('Missing type');
  }

  if (!data && type !== 'folder') {
    throw new Error('Missing data');
  }

  if (isPublic !== undefined && typeof isPublic !== 'boolean') {
    throw new Error('isPublic must be true or false');
  }

  if (parentId) {
    const parent = await dbClient.getDocument('files', ObjectId(parentId), '_id');
    if (!parent) {
      throw new Error('Parent not found');
    }

    if (parent.type !== 'folder') {
      throw new Error('Parent is not a folder');
    }
  }
};

const validate = {
  user,
  file,
};

export default validate;
