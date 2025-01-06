import { NextFunction, Request, Response } from 'express';

export interface IShopService {
  saveBackupDrafts: (req: Request, res: Response, next: NextFunction) => void;
  getLastDraft: (req: Request, res: Response, next: NextFunction) => void;

  saveBackupArchives: (req: Request, res: Response, next: NextFunction) => void;
  getLastArchives: (req: Request, res: Response, next: NextFunction) => void;
}
