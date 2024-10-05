import { MongoClient } from 'mongodb';
import config from '../config';

const uri = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
class DBClient {
  constructor() {
    this.isDbConnected = false;
    this.client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });

    this.client.connect((err) => {
      if (err) {
        console.error(err.message);
      } else {
        this.isDbConnected = true;
      }
    });
    this.db = this.client.db();
  }

  isAlive() {
    return this.isDbConnected;
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
    return this.getDocument(collectionName, insertedId, '_id');
  }

  async getDocument(collectionName, value, key = undefined) {
    if (!key) {
      return this.db.collection(collectionName).findOne({ value });
    }
    return this.db.collection(collectionName).findOne({ [key]: value });
  }

  async checkUserDoesntExist(email) {
    const user = await this.getDocument('users', email, 'email');
    if (user) {
      throw new Error('Already exist');
    }
  }

  async findUserOrThrow(credentials) {
    const user = await this.db.collection('users').findOne(credentials);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
}

const dbClient = new DBClient();

export default dbClient;
