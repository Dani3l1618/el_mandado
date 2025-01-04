import { Express, Request, Response } from 'express';
import { IUserService } from '../../service/user/IUserService';
import UserService from '../../service/user/UserService';
import IUserController from './IUserController';

class UserController implements IUserController {
  private readonly userService: IUserService = new UserService();
  public readonly PATH = '/api/users';

  constructor(private readonly app: Express) {}

  public registerRoutes(): void {
    this.registerPingRoute();
    this.registerControllerRoute();
  }

  public registerPingRoute(): void {
    this.app.route(`${this.PATH}/ping`).get((req: Request, res: Response) => {
      res.send('pong');
    });
  }

  public registerControllerRoute(): void {
    this.app
      .route(this.PATH)
      .post(this.userService.createUser)
      .get(this.userService.getAllUsers);
  }
}

export default UserController;
