import { Routes } from '@angular/router';

export enum AppRoutes {
  home = 'home',
  menu = 'menu',
  stores = 'tiendas',
}

export const routes: Routes = [
  {
    path: AppRoutes.home,
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: AppRoutes.menu,
    loadComponent: () =>
      import('./pages/menu/menu.page').then((m) => m.MenuPage),
  },
  {
    path: AppRoutes.stores,
    loadComponent: () =>
      import('./pages/tiendas/tiendas.page').then((m) => m.TiendasPage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tiendas',
    loadComponent: () =>
      import('./pages/tiendas/tiendas.page').then((m) => m.TiendasPage),
  },
];
