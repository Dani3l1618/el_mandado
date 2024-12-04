import { Component, computed, inject, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { SharedFabComponent } from 'src/app/shared';
import { Store } from '../tiendas/models';
import { ListShopEmptyComponent } from './components/list-shop-empty/list-shop-empty.component';
import { ListShopFabActionsComponent } from './components/list-shop-fab-actions/list-shop-fab-actions.component';
import { ListShopFooterComponent } from './components/list-shop-footer/list-shop-footer.component';
import { ListShopHeaderComponent } from './components/list-shop-header/list-shop-header.component';
import { ListShopListComponent } from './components/list-shop-list/list-shop-list.component';
import { ListShopDataManagerService } from './services/list-shop-data-manager.service';
import { ListShopService } from './services/list-shop.service';

const imports = [
  IonContent,

  ListShopHeaderComponent,
  ListShopFooterComponent,
  ListShopFabActionsComponent,
  ListShopEmptyComponent,
  ListShopListComponent,
  SharedFabComponent,
];

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.page.html',
  styleUrls: ['./list-shop.page.scss'],
  standalone: true,
  imports,
  providers: [ListShopService, ListShopDataManagerService],
})
export class ListShopPage {
  private listShopService = inject(ListShopService);
  private stores = signal<Store[]>([]);

  protected emptyList = computed(
    () => this.listShopService.listItemShop().length === 0,
  );

  listShopState = this.listShopService.listShopState;

  ionViewDidEnter() {
    // console.warn('Formulario de lista de compras desactivado!!!');
    // if (this.listShopState() === 'new') {
    //   this.getStores();
    //   this.setListConfig();
    // }
  }

  constructor() {
    console.log(
      '%ctodo: Guardar el tiempo en tienda',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    console.log(
      '%ctodo: Modo edición',
      'color: #1a4704; background-color: #d0f0c0;',
    );
  }

  protected openItemForm() {
    this.listShopService.openItemForm();
  }

  private async setListConfig() {
    const response = await this.listShopService.openListConfig();

    this.listShopService.handleListConfigResponse(response);
  }

  private async getStores() {
    this.stores.set(await this.listShopService.getStores());
  }
}
