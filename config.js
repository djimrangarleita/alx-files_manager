const config = {
  dbName: process.env.DB_DATABASE || 'files_manager',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '27017',

  serverPort: process.env.PORT || '5000',
};

export default config;
