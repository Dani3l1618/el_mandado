import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LISTSHOP_ITEMS, SHOP } from 'mocks/mocks';
import { timer } from 'rxjs';
import { AppRoutes } from 'src/app/app.routes';
import {
  DataService,
  ModalService,
  SharedConfirmDialogComponent,
} from 'src/app/shared';
import { Store } from '../../tiendas/models';
import { ListShopConfigComponent } from '../components/list-shop-config/list-shop-config.component';
import { ListShopConfig, ListShopItem } from '../models/list-shop.model';

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
  listShop = signal<ListShopItem[]>(LISTSHOP_ITEMS);
  listShopTotal = computed(() => this.totalListShop(this.listShop()));

  constructor() {
    console.log('Constructor!!!');
    timer(1000).subscribe(() => {
      this.storeConfig.set(SHOP);
    });
  }

  returnHome() {
    this.router.navigate([AppRoutes.menu]);
  }

  handleListConfigResponse(response: ListShopConfig | undefined): void {
    if (!response) {
      this.returnHome();
      return;
    }

    this.storeConfig.set(response);
  }

  //.- Item List management

  addListShopItem(item: ListShopItem) {
    this.listShop.update((items) => [...items, item]);
  }

  editListShopItem(itemId: string, newData: Partial<ListShopItem>) {
    const item = this.listShop().find((item) => item.id === itemId);

    if (!item) return;
    const itemUpdated = { ...item, ...newData };

    this.listShop.update((items) =>
      items.map((item) => (item.id === itemId ? itemUpdated : item)),
    );
  }

  totalListShop(listShop: ListShopItem[]): number {
    return listShop.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  //.- Store management

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

  //.- Dialogs

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

  async hanldeExit() {
    const exit = await this.modalService.openModal({
      component: SharedConfirmDialogComponent,
      componentProps: {
        title: 'Cancelar compra',
        question: '¿Cancelar compra y eliminar la lista?',
        confirmText: 'Aceptar',
      },
      cssClass: 'modal-sm',
    });

    if (exit) {
      this.resetListShopState();
      this.returnHome();
    }
  }

  //.- Private
  private resetListShopState() {
    this.storeConfig.set(undefined);
    this.stores.set([]);
  }
}
