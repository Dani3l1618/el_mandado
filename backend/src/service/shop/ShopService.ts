import { NextFunction, Request, Response } from 'express';
import { Shop, ShopDTO } from '../../models/shop.model';

import { BackupResponse } from '../../common/interface/IBackupResponse';
import { BackupDTO } from '../../models/backup.model';
import { ResponseDTO } from '../../models/response.model';
import { IShopService } from './IShopService';

class ShopService implements IShopService {
  public async saveBackupDrafts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await this.saveShop(req.body, 'draft', res, next);
  }

  public async getLastDraft(req: Request, res: Response, next: NextFunction) {
    await this.getLastShop('draft', res, next);
  }

  public saveBackupArchives(req: Request, res: Response, next: NextFunction) {
    this.saveShop(req.body, 'archive', res, next);
  }

  public getLastArchives(req: Request, res: Response, next: NextFunction) {
    this.getLastShop('archive', res, next);
  }

  private async saveShop(
    data: ShopDTO,
    type: 'draft' | 'archive',
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Invalid format');
      }
      const today = new Date();

      const backup: BackupDTO<ShopDTO> = {
        date: today,
        data: data,
        type
      };

      const newBackup = new Shop(backup);

      const mongoRes = await newBackup.save();

      const response: ResponseDTO<BackupResponse> = {
        message: 'Backup realizado',
        status: 201,
        response: {
          date: today,
          backupID: mongoRes._id.toString()
        }
      };

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  private async getLastShop(
    type: 'draft' | 'archive',
    res: Response,
    next: NextFunction
  ) {
    try {
      const stores = await Shop.find({ type }).sort({
        date: 'desc'
      });

      const response: ResponseDTO<any> = {
        message: 'Backup recuperado',
        status: 200,
        response: stores[0] ?? []
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default ShopService;
