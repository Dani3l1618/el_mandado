import { Request, Response } from 'express';

export interface IStoreService {
  saveStores: (req: Request, res: Response) => void;
  getAllStores: (req: Request, res: Response) => void;
}
