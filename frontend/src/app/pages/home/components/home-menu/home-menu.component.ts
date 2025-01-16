import { Component, inject, signal } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/AppRoutes';
import { MENU_ITEMS } from 'src/app/pages/menu';
import { IconComponent } from 'src/app/shared';
import { HomeService } from '../../services';

const imports = [IonText, IconComponent];

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
  imports,
})
export class HomeMenuComponent {
  private readonly homeService = inject(HomeService);
  menuItems = signal(MENU_ITEMS);

  navigate(url: AppRoutes) {
    this.homeService.navigateTo(url);
  }
}
