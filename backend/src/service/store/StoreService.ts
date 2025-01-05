import { NextFunction, Request, Response } from 'express';
import { BackupResponse } from '../../common/interface/IBackupResponse';
import { BackupDTO } from '../../models/backup.model';
import { ResponseDTO } from '../../models/response.model';
import { Store, StoreDTO } from '../../models/store.model';
import { IStoreService } from './IStoreService';

class StoreService implements IStoreService {
  public async saveBackup(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = req.body as StoreDTO[];

      if (!Array.isArray(stores)) {
        throw new Error('Invalid format');
      }

      const today = new Date();

      const backup: BackupDTO<StoreDTO> = {
        date: today,
        data: stores
      };

      const newBackup = new Store(backup);

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
    } catch (err) {
      next(err);
    }
  }

  public async getLastBackup(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = await Store.find().sort({
        date: 'desc'
      });

      const response: ResponseDTO<any> = {
        message: 'Backup recuperado',
        status: 200,
        response: stores[0]
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default StoreService;
