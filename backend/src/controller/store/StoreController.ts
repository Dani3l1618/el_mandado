import { IControllerCommon } from '@common/interface/IControllerCommon';
import { IStoreService } from '@service/store/IStoreService';
import StoreService from '@service/store/StoreService';
import { Express, Request, Response } from 'express';

class StoreController implements IControllerCommon {
  private readonly storeService: IStoreService = new StoreService();
  public readonly PATH = '/api/stores';
  public readonly controllerName = 'StoreController';

  constructor(private readonly app: Express) {}

  public registerRoutes(): void {
    this.registerPingRoute();
    this.registerControllerRoute();
  }

  public registerPingRoute(): void {
    this.app.route(`${this.PATH}/ping`).get((req: Request, res: Response) => {
      res.send('pong');
    });
  }

  public registerControllerRoute(): void {
    this.app
      .route(this.PATH)
      .post(this.storeService.saveBackup)
      .get(this.storeService.getLastBackup);
  }
}

export default StoreController;
