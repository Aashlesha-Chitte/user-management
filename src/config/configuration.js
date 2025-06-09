import { config } from 'dotenv';
config();

const envVars = process.env;

let configurations = Object.freeze({
  env: envVars.NODE_ENV,
  mongoAdmin: envVars.MONGO_ADMIN_URL,
  port: envVars.PORT,
  serverURL: envVars.SERVER_URL,
  envName: envVars.NODE_ENV,
});

export default configurations;
