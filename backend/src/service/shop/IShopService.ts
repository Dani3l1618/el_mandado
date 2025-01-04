import { Request, Response } from 'express';

export interface IShopService {
  saveDrafts: (req: Request, res: Response) => void;
  getAllDrafts: (req: Request, res: Response) => void;

  saveArchives: (req: Request, res: Response) => void;
  getAllArchives: (req: Request, res: Response) => void;
}
