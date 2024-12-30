import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonText } from '@ionic/angular/standalone';

import { MenuConfigComponent } from './components/menu-config/menu-config.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuItem } from './models';
import { MenuService } from './services';

const imports = [
  IonContent,
  IonText,

  MenuConfigComponent,
  MenuItemListComponent,
];
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports,
})
export class MenuPage implements OnInit {
  private menuService = inject(MenuService);

  menuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.loadItems();
  }

  goHome() {
    this.menuService.goHome();
  }

  loadItems() {
    const menuItems = this.menuService.getMenuItems();
    this.menuItems.set(menuItems);
  }
}
