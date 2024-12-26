import { Routes } from '@angular/router';

export enum AppRoutes {
  home = 'home',
  menu = 'menu',
  stores = 'tiendas',
  newList = 'list-shop/new-list',
  draftList = 'list-shop/draft-list',
  viewList = 'list-shop/view-list/:id',
  history = 'history',
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
    path: AppRoutes.viewList,
    loadComponent: () =>
      import('./pages/list-shop/list-shop.page').then((m) => m.ListShopPage),
  },
  {
    path: AppRoutes.history,
    loadComponent: () =>
      import('./pages/history/history.page').then((c) => c.HistoryPage),
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
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/history/history.page').then((m) => m.HistoryPage),
  },
];
