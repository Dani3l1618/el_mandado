import dotenv from 'dotenv';
import App from './app';

dotenv.config();
const APP_PORT = process.env.PORT || 3000;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_HOST = process.env.MONGO_HOST;
const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}`;

const app = new App(mongoUri).app;

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});