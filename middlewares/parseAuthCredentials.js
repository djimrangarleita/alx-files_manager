const parseAuthCredentials = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).send({ error: 'Missing or invalid Authorization header' });
  }
  const base64Credentials = authHeader.split(' ')[1];
  const emailPassword = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = emailPassword.split(':');
  if (!email || !password) {
    return res.status(401).send({ error: 'Missing credentials' });
  }
  req.auth_credentials = { email, password };
  return next();
};

export default parseAuthCredentials;
