export const getUser = (userObject) => ({
  id: userObject._id,
  email: userObject.email,
});

export const getFile = (object) => ({
  id: object._id,
  name: object.name,
  type: object.type,
});
