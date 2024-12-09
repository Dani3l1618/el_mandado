import { Routes } from '@angular/router';

export enum AppRoutes {
  home = 'home',
  menu = 'menu',
  stores = 'tiendas',
  newList = 'list-shop/new-list',
  draftList = 'list-shop/draft-list',
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
    path: AppRoutes.newList,
    loadComponent: () =>
      import('./pages/list-shop/list-shop.page').then((m) => m.ListShopPage),
  },
  {
    path: AppRoutes.draftList,
    loadComponent: () =>
      import('./pages/list-shop/list-shop.page').then((m) => m.ListShopPage),
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
  {
    path: 'list-shop',
    loadComponent: () =>
      import('./pages/list-shop/list-shop.page').then((m) => m.ListShopPage),
  },
];
