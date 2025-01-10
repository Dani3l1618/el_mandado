import { BackupResponse } from '@common/interface/IBackupResponse';
import { AppDataBackup, BackupDTO } from '@models/backup.model';
import { ResponseDTO } from '@models/response.model';
import { Shop, ShopDTO } from '@models/shop.model';
import { Store, StoreDTO } from '@models/store.model';
import { NextFunction, Request, Response } from 'express';
import { IBackupService } from './IBackupService';

class BackupService implements IBackupService {
  public async saveBackup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as AppDataBackup;
      const [backupStore, backupDraft, backupArchive] = this.getDTOs(data);
      const newStoreBk = new Store(backupStore);
      const newDraftBk = new Shop(backupDraft);
      const newArchiveBk = new Shop(backupArchive);

      const [r1, r2, r3] = await Promise.all([
        newArchiveBk.save(),
        newDraftBk.save(),
        newStoreBk.save()
      ]);

      const response: ResponseDTO<BackupResponse> = {
        message: 'Backup completado',
        status: 201,
        response: {
          date: new Date(),
          backupID: [r1._id.toString(), r2._id.toString(), r3._id.toString()]
        }
      };

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async retrieveLastBackup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const lastStoreBk = Store.find().sort({
        date: 'desc'
      });
      const lastDraftBk = Shop.find({ type: 'draft' }).sort({
        date: 'desc'
      });
      const lastArchiveBk = Shop.find({ type: 'archive' }).sort({
        date: 'desc'
      });

      const [archive, draft, store] = await Promise.all([
        lastArchiveBk,
        lastDraftBk,
        lastStoreBk
      ]);

      const response: ResponseDTO<any> = {
        message: 'Last backup retrieve successfully',
        status: 200,
        response: {
          draft: draft.at(0) ?? null,
          archive: archive.at(0) ?? null,
          store: store.at(0) ?? null
        }
      };

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  private getDTOs(
    data: AppDataBackup
  ): [BackupDTO<StoreDTO>, BackupDTO<ShopDTO>, BackupDTO<ShopDTO>] {
    const today = new Date();
    const backupStore = {
      date: today,
      data: data.stores
    };

    const backupDraft = {
      date: today,
      data: data.drafts,
      type: 'draft'
    };

    const backupArchive = {
      date: today,
      data: data.archives,
      type: 'archive'
    };

    return [backupStore, backupDraft, backupArchive];
  }
}

export default BackupService;
