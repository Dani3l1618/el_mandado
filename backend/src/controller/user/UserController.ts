import { IControllerCommon } from '@common/interface/IControllerCommon';
import { IUserService } from '@service/user/IUserService';
import UserService from '@service/user/UserService';
import { Express, Request, Response } from 'express';

class UserController implements IControllerCommon {
  private readonly userService: IUserService = new UserService();
  public readonly PATH = '/api/users';
  public readonly controllerName = 'UserController';

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
