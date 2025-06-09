import mongoose from 'mongoose';
import seedData from './seedData.js';

class Database {
  static async open({ mongoUri }) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB connected: ${mongoUri}`);

      await seedData();

    } catch (err) {
      console.error(`Error while connecting to database: ${mongoUri} ${JSON.stringify(err)}`);
      throw new Error(`Unable to connect to database: ${mongoUri}`);
    }
  }

  static async close() {
    await mongoose.disconnect();
  }
}

export default Database;
