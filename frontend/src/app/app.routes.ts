import { Routes } from '@angular/router';
import { AppRoutes } from './AppRoutes';
import { archivesCheckGuard, draftCheckGuard, storeCheckGuard } from './shared';

export const routes: Routes = [
  {
    path: AppRoutes.home,
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: AppRoutes.stores,
    loadComponent: () =>
      import('./pages/tiendas/tiendas.page').then((m) => m.TiendasPage),
  },
  {
    path: AppRoutes.newList,
    canActivate: [storeCheckGuard],
    loadComponent: () =>
      import('./pages/list-shop/list-shop.page').then((m) => m.ListShopPage),
  },
  {
    path: AppRoutes.draftList,
    canActivate: [draftCheckGuard],
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
    canActivate: [archivesCheckGuard],
    loadComponent: () =>
      import('./pages/history/history.page').then((c) => c.HistoryPage),
  },
  {
    path: AppRoutes.search,
    loadComponent: () =>
      import('./pages/search/search.page').then((c) => c.SearchPage),
  },
  {
    path: AppRoutes.sync,
    loadComponent: () =>
      import('./pages/sync/sync.page').then((c) => c.SyncPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
