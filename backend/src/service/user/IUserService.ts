import { Request, Response } from 'express';

export interface IUserService {
  createUser: (req: Request, res: Response) => void;
  getAllUsers: (req: Request, res: Response) => void;
}
