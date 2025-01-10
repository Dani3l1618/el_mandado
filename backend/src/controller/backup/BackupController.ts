import { IControllerCommon } from '@common/interface/IControllerCommon';
import BackupService from '@service/backup/BackupService';
import { IBackupService } from '@service/backup/IBackupService';
import { Express, Request, Response } from 'express';

class BackupController implements IControllerCommon {
  private readonly backupService: IBackupService = new BackupService();
  public readonly PATH = '/api/backup';
  public readonly controllerName = 'BackupController';

  constructor(private readonly app: Express) {}

  registerRoutes(): void {
    this.registerPingRoute();
    this.registerControllerRoute();
  }
  registerPingRoute(): void {
    this.app.route(`${this.PATH}/ping`).get((req: Request, res: Response) => {
      res.send('pong');
    });
  }
  registerControllerRoute(): void {
    this.app
      .route(`${this.PATH}`)
      .post((req, res, next) => this.backupService.saveBackup(req, res, next))
      .get((req, res, next) =>
        this.backupService.retrieveLastBackup(req, res, next)
      );
  }
}

export default BackupController;
