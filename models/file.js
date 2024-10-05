import config from '../config';

const parsedFile = (uploadedFile, userId) => {
  const fileData = {
    userId,
    name: uploadedFile.name,
    type: uploadedFile.type,
    isPublic: uploadedFile.isPublic === true,
    parentId: uploadedFile.parentId || 0,
    localPath: config.folderPath,
  };

  return fileData;
};

export default parsedFile;
