import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NOTIFY_MESSAGES } from '../constants/notify.config';
import { AppStorageService } from '../services/app-storage.service';
import { NotifyService } from '../services/notify.service';

export const draftCheckGuard: CanActivateFn = async (route, state) => {
  const appStorageService = inject(AppStorageService);
  const notifyService = inject(NotifyService);
  const hasDrafts = (await appStorageService.getDrafts()).length > 0;
  if (hasDrafts) {
    return true;
  }

  notifyService.presentSucccess({
    message: NOTIFY_MESSAGES.checkDraftGuard,
  });
  return false;
};
