import { NextFunction, Request, Response } from 'express';

export interface IBackupService {
  saveBackup: (req: Request, res: Response, next: NextFunction) => void;
  retrieveLastBackup: (req: Request, res: Response, next: NextFunction) => void;
}
