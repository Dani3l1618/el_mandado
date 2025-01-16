import { inject, Injectable } from '@angular/core';
import { AppRoutes } from 'src/app/AppRoutes';
import { NavigateService } from 'src/app/shared';
import { MENU_ITEMS } from '../constants/menu-items';
import { MenuItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private navigateService = inject(NavigateService);

  getMenuItems(): MenuItem[] {
    return MENU_ITEMS;
  }

  goHome() {
    this.navigateService.navigateTo(AppRoutes.home);
  }

  goTo(url: AppRoutes) {
    this.navigateService.navigateTo(url);
  }
}
