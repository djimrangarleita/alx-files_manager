import { ObjectId } from 'mongodb';

const parsedFile = (uploadedFile, userId, filePath) => {
  let parentId;
  if (uploadedFile.parentId) {
    parentId = ObjectId(uploadedFile.parentId);
  }
  const fileData = {
    userId,
    name: uploadedFile.name,
    type: uploadedFile.type,
    parentId: parentId || 0,
  };
  if (fileData.type !== 'folder') {
    fileData.localPath = filePath;
    fileData.isPublic = Boolean(uploadedFile.isPublic);
  }

  return fileData;
};

export default parsedFile;
