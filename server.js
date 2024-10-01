import express from 'express';
import config from './config';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(config.serverPort, () => {
  console.log(`Server running on port ${config.serverPort}`);
});
