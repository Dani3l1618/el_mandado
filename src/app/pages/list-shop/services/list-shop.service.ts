import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { DataService, ModalService } from 'src/app/shared';
import { Store } from '../../tiendas/models';
import { ListShopConfigComponent } from '../components/list-shop-config/list-shop-config.component';
import { ListShopConfig } from '../models/list-shop.model';

@Injectable()
export class ListShopService {
  private router = inject(Router);
  private dataService = inject(DataService);
  private modalService = inject(ModalService);
  private stores = signal<Store[]>([]);
  storeConfig = signal<ListShopConfig | undefined>(undefined);

  listShopState: WritableSignal<'new' | 'draft'> = signal(
    this.router.url.includes('new-list') ? 'new' : 'draft',
  );

  constructor() {
    // timer(1000).subscribe(() => {
    //   this.storeConfig.set({
    //     store: {
    //       chain: StoreChain.bodegaAurrera,
    //       street: 'Av. Texcoco',
    //       city: 'La Paz',
    //       colonia: 'Nezahualcoyotl',
    //       state: 'MEX',
    //       postalCode: '56514',
    //       id: '1f74f9f5-4b86-40b9-8560-81df5fb9460a',
    //       img: StoreMedia.bodegaAurrera,
    //       lastUpdate: new Date('2024-11-15T23:30:17.440Z'),
    //     },
    //     budget: 4200,
    //   });
    // });
  }

  returnHome() {
    this.router.navigate([AppRoutes.menu]);
  }

  async getStores(): Promise<Store[]> {
    console.log(
      '%ctodo: Crear un temporizador, apra ver cuento tiempo llevo en la tienda, e inicia al agregar el primer artículo',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    const stores = (await this.dataService.getData<Store[]>('stores')) ?? [];

    this.stores.set(stores);

    return stores;
  }

  async getStoreBy(storeId: string): Promise<Store | undefined> {
    const stores = await this.getStores();
    return stores.find((store) => store.id === storeId);
  }

  async openListConfig(): Promise<ListShopConfig | undefined> {
    const response: ListShopConfig | undefined =
      await this.modalService.openModal({
        component: ListShopConfigComponent,
        componentProps: {
          stores: this.stores,
        },
      });

    return response;
  }

  handleListConfigResponse(response: ListShopConfig | undefined): void {
    if (!response) {
      this.returnHome();
      return;
    }

    this.storeConfig.set(response);
  }
}
