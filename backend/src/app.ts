import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import ShopController from './controller/shop/ShopController';
import StoreController from './controller/store/StoreController';
import UserController from './controller/user/UserController';

class App {
  public readonly app = express();
  private readonly controllers = [
    new UserController(this.app),
    new StoreController(this.app),
    new ShopController(this.app)
  ];
  constructor(private readonly mongoUri: string) {
    this.config();
    this.connectToDatabase();
    this.registerControllers();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private registerControllers() {
    this.controllers.forEach((controller) => {
      controller.registerRoutes();
    });
  }

  private connectToDatabase() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${this.mongoUri}?authSource=admin`).then(() => {
      console.log('Database connection successful');
    });
  }
}

export default App;
