import { IControllerCommon } from '@common/interface/IControllerCommon';
import { IShopService } from '@service/shop/IShopService';
import ShopService from '@service/shop/ShopService';
import { Express, Request, Response } from 'express';

class ShopController implements IControllerCommon {
  private readonly shopService: IShopService = new ShopService();
  public readonly controllerName = 'ShopController';
  public readonly PATH = '/api/shop';

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
      .route(`${this.PATH}/drafts`)
      .post((req, res, next) =>
        this.shopService.saveBackupDrafts(req, res, next)
      )
      .get((req, res, next) => this.shopService.getLastDraft(req, res, next));

    this.app
      .route(`${this.PATH}/archives`)
      .post((req, res, next) =>
        this.shopService.saveBackupArchives(req, res, next)
      )
      .get((req, res, next) =>
        this.shopService.getLastArchives(req, res, next)
      );
  }
}

export default ShopController;
