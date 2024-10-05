export const getUser = (userObject) => ({
  id: userObject._id,
  email: userObject.email,
});

export const getFile = (object) => {
  const { _id, localPath, ...file } = object;
  const fileDto = { id: object._id, ...file };
  return fileDto;
};
