import { BackupResponse } from '@common/interface/IBackupResponse';
import {
  AppDataBackup,
  AppDataBackupDto,
  BackupDTO
} from '@models/backup.model';
import { ResponseDTO } from '@models/response.model';
import { Shop, ShopDTO } from '@models/shop.model';
import { Store, StoreDTO } from '@models/store.model';
import { NextFunction, Request, Response } from 'express';
import { IBackupService } from './IBackupService';

class BackupService implements IBackupService {
  public async saveBackup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as AppDataBackup;
      const { stores, drafts, archives } = this.getDTOs(data);

      const [r1, r2, r3] = await Promise.all([
        this.trySaveShopBk(archives),
        this.trySaveShopBk(drafts),
        this.trySaveStoreBk(stores)
      ]);

      const response: ResponseDTO<BackupResponse> = {
        message: 'Backup completado',
        status: 201,
        response: {
          date: new Date(),
          backupID: {
            archives: r1,
            drafts: r2,
            stores: r3
          }
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
          drafts: draft.at(0) ?? null,
          archives: archive.at(0) ?? null,
          stores: store.at(0) ?? null
        }
      };

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  private getDTOs({
    stores,
    drafts,
    archives
  }: AppDataBackup): AppDataBackupDto {
    const today = new Date();
    const backupStore =
      stores.length > 0
        ? {
            date: today,
            data: stores
          }
        : null;

    const backupDraft =
      drafts.length > 0
        ? {
            date: today,
            data: drafts,
            type: 'draft'
          }
        : null;

    const backupArchive =
      archives.length > 0
        ? {
            date: today,
            data: archives,
            type: 'archive'
          }
        : null;

    return {
      stores: backupStore,
      drafts: backupDraft,
      archives: backupArchive
    };
  }

  private async trySaveStoreBk(
    data: BackupDTO<StoreDTO> | null
  ): Promise<string | null> {
    console.log(JSON.stringify(data));
    const store = await new Store(data).save();
    return store._id.toString();
  }

  private async trySaveShopBk(
    data: BackupDTO<ShopDTO> | null
  ): Promise<string | null> {
    try {
      const shop = await new Shop(data).save();
      return shop._id.toString();
    } catch (e) {
      return null;
    }
  }
}

export default BackupService;
