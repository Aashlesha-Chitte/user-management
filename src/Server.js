import express from 'express';
// import Database from './libs/Database';
import router from './router.js';
import Database from './libs/Database.js';

export default class Server {
  constructor(config) {
    this.app = express();
    this.config = config;
  }

  async bootstrap() {
    this.app.use(express.json());
    this.setupRoutes();
    return this.app;
  }


  setupRoutes() {
    this.app.use('/api', router);
  }


  run() {
    const { port, mongoAdmin } = this.config;

    Database.open({ mongoUri: mongoAdmin })
      .then(() => {
        console.error('Database connection Successfully');
        this.app.listen(port, () => {
          console.info(`Server running at port ${port}`);
          console.info('Press CTRL+C to stop');
        });
      })
      .catch((err) => console.error('Database connection error:', err));

    return this;
  }

}
