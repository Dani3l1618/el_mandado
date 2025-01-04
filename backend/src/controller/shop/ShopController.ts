import { Express, Request, Response } from 'express';
import { IControllerCommon } from '../../common/interface/IControllerCommon';
import { IShopService } from '../../service/shop/IShopService';
import ShopService from '../../service/shop/ShopService';

class ShopController implements IControllerCommon {
  private readonly shopService: IShopService = new ShopService();
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
      .post((req, res) => this.shopService.saveDrafts(req, res))
      .get((req, res) => this.shopService.getAllDrafts(req, res));

    this.app
      .route(`${this.PATH}/archives`)
      .post((req, res) => this.shopService.saveArchives(req, res))
      .get((req, res) => this.shopService.getAllArchives(req, res));
  }
}

export default ShopController;
