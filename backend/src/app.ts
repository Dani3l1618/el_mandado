import { errorHanlder } from '@common/functions/errorhandler';
import { IControllerCommon } from '@common/interface/IControllerCommon';
import BackupController from '@controller/backup/BackupController';
import ShopController from '@controller/shop/ShopController';
import StoreController from '@controller/store/StoreController';
import UserController from '@controller/user/UserController';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

class App {
  public readonly app = express();
  private readonly controllers: IControllerCommon[] = [
    new UserController(this.app),
    new StoreController(this.app),
    new ShopController(this.app),
    new BackupController(this.app)
  ];
  constructor(private readonly mongoUri: string) {
    this.config();
    this.connectToDatabase();
    this.registerControllers();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(errorHanlder);
  }

  private registerControllers() {
    this.controllers.forEach((controller) => {
      controller.registerRoutes();
    });
    this.app.use(errorHanlder);
  }

  private connectToDatabase() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${this.mongoUri}?authSource=admin`).then(() => {
      console.log('Database connection successful');
    });
  }
}

export default App;
