import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import {
  DataService,
  ModalService,
  SharedConfirmDialogComponent,
} from 'src/app/shared';
import { Store } from '../../tiendas/models';
import { ListShopConfigComponent } from '../components/list-shop-config/list-shop-config.component';
import { ListShopFormComponent } from '../components/list-shop-form/list-shop-form.component';
import { ListShopSelectDraftComponent } from '../components/list-shop-select-draft/list-shop-select-draft.component';
import {
  ListShop,
  ListShopConfig,
  ListShopDraft,
  ListShopItem,
  ListShopItemForm,
} from '../models/list-shop.model';
import { ListShopDataManagerService } from './list-shop-data-manager.service';

@Injectable()
export class ListShopService {
  private router = inject(Router);
  private dataService = inject(DataService);
  private modalService = inject(ModalService);
  private dataManager = inject(ListShopDataManagerService);
  private stores = signal<Store[]>([]);

  timeInStore = signal(0);
  storeConfig = signal<ListShopConfig | undefined>(undefined);
  listShopState: WritableSignal<'new' | 'draft'> = signal(
    this.router.url.includes('new-list') ? 'new' : 'draft',
  );

  listItemShop = signal<ListShopItem[]>([]);
  listShopTotal = computed(() => this.totalListShop(this.listItemShop()));
  listSaved = this.dataManager.listSaved;

  listDrafts = signal<ListShop[]>([]);

  returnHome() {
    this.resetListShopState();
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
    this.listItemShop.update((items) => [item, ...items]);
  }

  editListShopItem(itemId: string, newData: Partial<ListShopItem>) {
    const item = this.listItemShop().find((item) => item.id === itemId);

    if (!item) return;
    const itemUpdated = { ...item, ...newData };
    this.listItemShop.update((items) =>
      items.map((item) => (item.id === itemId ? itemUpdated : item)),
    );
  }

  deleteItem(itemId: string) {
    this.listItemShop.update((items) =>
      items.filter((item) => item.id !== itemId),
    );
  }

  addNewItem(item: ListShopItemForm) {
    const newItem: ListShopItem = {
      ...item,
      id: this.dataService.generateId(),
    };

    this.addListShopItem(newItem);
  }

  totalListShop(listShop: ListShopItem[]): number {
    return listShop.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  //.- Store management

  async getStores(): Promise<Store[]> {
    const stores = (await this.dataService.getData<Store[]>('stores')) ?? [];

    this.stores.set(stores);

    return stores;
  }

  async getStoreBy(storeId: string): Promise<Store | undefined> {
    const stores = await this.getStores();
    return stores.find((store) => store.id === storeId);
  }

  async saveListShopOnDrafts() {
    this.listItemShop.update((items) =>
      items.filter((item) => item.quantity !== 0),
    );

    await this.saveDraft();

    await this.dataManager.saveListShopOnDrafts();
    this.returnHome();
  }

  async saveDraft() {
    const listInfo: ListShopDraft = {
      items: this.listItemShop(),
      storeConfig: this.storeConfig()!,
      total: this.listShopTotal(),
      time: this.timeInStore(),
    };
    await this.dataManager.saveDraftList(listInfo);
  }

  async getDrafts(): Promise<void> {
    const drafts = await this.dataManager.getDrafts();

    this.listDrafts.set(drafts);
  }

  //.- Dialogs

  async openListConfig(): Promise<ListShopConfig | undefined> {
    console.log(
      '%ctodo: Manejar cuando no haya tiendas',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    const response: ListShopConfig | undefined =
      await this.modalService.openModal({
        component: ListShopConfigComponent,
        componentProps: {
          stores: this.stores,
        },
      });

    return response;
  }

  async openDraftConfig(): Promise<ListShop | undefined> {
    console.log(
      '%ctodo: Manejar cuando no haya draft',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    this.getDrafts();
    const response: ListShop | undefined = await this.modalService.openModal({
      component: ListShopSelectDraftComponent,
      componentProps: {
        listShopService: this,
      },
      cssClass: ['modal-25'],
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
      this.returnHome();
    }
  }

  async openFinishShopConfirmation() {
    const finish = await this.modalService.openModal({
      component: SharedConfirmDialogComponent,
      componentProps: {
        title: 'Terminar compras',
        question: '¿Finalizar día de shopping?',
        confirmText: 'Aceptar',
      },
      cssClass: 'modal-sm',
    });
    return Boolean(finish);
  }

  async openItemForm(item?: ListShopItem) {
    const newItem = await this.modalService.openModal({
      component: ListShopFormComponent,
      componentProps: {
        listShopService: this,
        itemOnEdit: signal(item),
      },
    });

    return newItem;
  }

  //.- Private
  private resetListShopState() {
    this.storeConfig.set(undefined);
    this.stores.set([]);
    this.listItemShop.set([]);
    this.dataManager.reset();
  }
}
