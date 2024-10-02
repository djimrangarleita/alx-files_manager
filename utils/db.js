import { MongoClient } from 'mongodb';
import config from '../config';

const uri = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
class DBClient {
  constructor() {
    this.client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });

    this.client.connect();
    this.db = this.client.db();
  }

  async isAlive() {
    try {
      return this.client.isConnected();
    } catch (error) {
      console.error('[PINGERROR]', error.message);
      return false;
    }
  }

  async nbUsers() {
    try {
      return this.db.collection('users').countDocuments();
    } catch (error) {
      console.error('[USERCOUNTERROR]', error.message);
      return 0;
    }
  }

  async nbFiles() {
    try {
      return this.db.collection('files').countDocuments();
    } catch (error) {
      console.error('[FILESCOUNTERROR]', error.message);
      return 0;
    }
  }

  async createDocument(collectionName, doc) {
    if (collectionName === 'users') {
      await this.checkUserDoesntExist(doc.email);
    }
    const { insertedId } = await this.db.collection(collectionName).insertOne(doc);
    return this.getDocumentByKV(collectionName, '_id', insertedId);
  }

  async getDocumentByKV(collectionName, key, value) {
    return this.db.collection(collectionName).findOne({ [key]: value });
  }

  async checkUserDoesntExist(email) {
    const user = await this.getDocumentByKV('users', 'email', email);
    if (user) {
      throw new Error('Already exist');
    }
  }
}

const dbClient = new DBClient();

export default dbClient;
