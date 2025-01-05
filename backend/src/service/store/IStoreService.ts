import { NextFunction, Request, Response } from 'express';

export interface IStoreService {
  saveBackup: (req: Request, res: Response, next: NextFunction) => void;
  getLastBackup: (req: Request, res: Response, next: NextFunction) => void;
}
