import { Usuario } from '@models/user.model';
import { Request, Response } from 'express';
import { IUserService } from './IUserService';

class UserService implements IUserService {
  public async createUser(req: Request, res: Response) {
    try {
      const usuario = new Usuario(req.body);
      const resultado = await usuario.save();
      res.status(201).json(resultado);
    } catch (error) {
      res.send(error);
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.send(error);
    }
  }
}

export default UserService;
