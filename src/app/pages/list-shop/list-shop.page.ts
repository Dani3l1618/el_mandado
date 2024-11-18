import { Component, inject, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ModalService } from 'src/app/shared';
import { Store } from '../tiendas/models';
import { ListShopHeaderComponent } from './components/list-shop-header/list-shop-header.component';
import { ListShopInfoComponent } from './components/list-shop-info/list-shop-info.component';
import { ListShopService } from './services/list-shop.service';

const imports = [IonContent, ListShopInfoComponent, ListShopHeaderComponent];

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.page.html',
  styleUrls: ['./list-shop.page.scss'],
  standalone: true,
  imports,
  providers: [ListShopService],
})
export class ListShopPage {
  private listShopService = inject(ListShopService);
  private modalService = inject(ModalService);
  private stores = signal<Store[]>([]);

  listShopState = this.listShopService.listShopState;

  ionViewDidEnter() {
    console.warn('Formulario de lista de compras desactivado!!!');
    if (this.listShopState() === 'new') {
      this.getStores();
      this.setListConfig();
    }
  }

  private async setListConfig() {
    const response = await this.listShopService.openListConfig();

    this.listShopService.handleListConfigResponse(response);
  }

  private async getStores() {
    this.stores.set(await this.listShopService.getStores());
  }
}
