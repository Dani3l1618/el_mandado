import dotenv from 'dotenv';
import App from './app';

dotenv.config();
const APP_PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;
const mongoUri = `${MONGO_URI}/${MONGO_DB}`;

const app = new App(mongoUri).app;

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});