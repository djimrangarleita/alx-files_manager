import { MongoClient } from 'mongodb';
import config from '../config';

const uri = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
class DBClient {
  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect();
    this.db = this.client.db();
  }

  async isAlive() {
    return this.client.isConnected();
    // try {
    // } catch (error) {
    //   console.error('[PINGERROR]', error.message);
    //   return false;
    // }
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
    // try {
    // } catch (error) {
    //   console.error('[USERCOUNTERROR]', error.message);
    //   return 0;
    // }
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
    // try {
    // } catch (error) {
    //   console.error('[FILESCOUNTERROR]', error.message);
    //   return 0;
    // }
  }
}

const dbClient = new DBClient();

export default dbClient;
