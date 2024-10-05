const config = {
  dbName: process.env.DB_DATABASE || 'files_manager',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '27017',

  serverPort: process.env.PORT || '5000',

  authTokenTtl: process.env.AUTH_TOKEN_TTL || 86400,

  folderPath: process.env.FOLDER_PATH || '/tmp/files_manager',
};

export default config;
