export const validateUser = (doc) => {
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

export const validateFiles = () => {};
