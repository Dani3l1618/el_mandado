export interface IControllerCommon {
  controllerName: string;

  registerRoutes(): void;

  registerPingRoute(): void;

  registerControllerRoute(): void;
}
