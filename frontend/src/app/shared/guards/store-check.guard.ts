import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoutes } from 'src/app/AppRoutes';
import { NOTIFY_MESSAGES } from '../constants/notify.config';
import { AppStorageService } from '../services/app-storage.service';
import { NotifyService } from '../services/notify.service';

export const storeCheckGuard: CanActivateFn = async (route, state) => {
  const appStorageService = inject(AppStorageService);
  const notifyService = inject(NotifyService);
  const router = inject(Router);
  const hasStores = (await appStorageService.getStores()).length > 0;
  if (hasStores) {
    return true;
  }

  notifyService.presentError({
    message: NOTIFY_MESSAGES.checkStoreGuard,
  });
  return router.parseUrl(AppRoutes.stores);
};
