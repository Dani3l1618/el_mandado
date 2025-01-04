import { Request, Response } from 'express';
import { Shop } from '../../models/shop.model';

import { IShopService } from './IShopService';

class ShopService implements IShopService {
  public async saveDrafts(req: Request, res: Response) {
    await this.saveShop(req.body, 'draft', res);
  }

  public async getAllDrafts(req: Request, res: Response) {
    await this.getAllShops('draft', res);
  }

  public saveArchives(req: Request, res: Response) {
    this.saveShop(req.body, 'archive', res);
  }

  public getAllArchives(req: Request, res: Response) {
    this.getAllShops('archive', res);
  }

  private async saveShop(data: any, type: 'draft' | 'archive', res: Response) {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Invalid format');
      }
      await Shop.deleteMany({ type });
      const newShops = data.map((shop: any) => ({ ...shop, type }));
      const result = await Shop.insertMany(newShops, {
        throwOnValidationError: true
      });

      res.status(201).json({
        message: 'Archivos reemplazados exitosamente.',
        count: result.length,
        stores: result
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async getAllShops(type: 'draft' | 'archive', res: Response) {
    try {
      const shops = await Shop.find({ type });
      res.json(shops);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default ShopService;
