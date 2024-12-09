import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { DataService } from 'src/app/shared';
import { Store } from '../../tiendas/models';
import {
  ListShop,
  ListShopConfig,
  ListShopItem,
  ListShopItemForm,
} from '../models/list-shop.model';
import { ListShopDataManagerService } from './list-shop-data-manager.service';
import { ListShopDialogsService } from './list-shop-dialogs.service';
import { ListShopStateService } from './list-shop-state.service';

@Injectable()
export class ListShopService {
  private router = inject(Router);
  private dataService = inject(DataService);

  private dataManager = inject(ListShopDataManagerService);
  private dialogService = inject(ListShopDialogsService);
  private state = inject(ListShopStateService);

  constructor() {
    this.state.mode.set(this.router.url.includes('new-list') ? 'new' : 'draft');
  }

  returnHome() {
    this.resetListShopState();
    this.router.navigate([AppRoutes.menu]);
  }

  async initNewMode(): Promise<void> {
    await this.getStores();
    const storeConfig = await this.openListConfig();

    if (!storeConfig) {
      this.returnHome();
      return;
    }

    this.state.storeConfig.set(storeConfig);
  }

  //.- Item List management

  addNewItem(item: ListShopItemForm) {
    const newItem: ListShopItem = {
      ...item,
      id: this.dataService.generateId(),
    };

    this.addListShopItem(newItem);
  }

  editListShopItem(itemId: string, newData: Partial<ListShopItem>) {
    const item = this.state.listItemShop().find((item) => item.id === itemId);

    if (!item) return;

    const itemUpdated = { ...item, ...newData };
    this.state.listItemShop.update((items) =>
      items.map((item) => (item.id === itemId ? itemUpdated : item)),
    );
  }

  deleteItem(itemId: string) {
    this.state.listItemShop.update((items) =>
      items.filter((item) => item.id !== itemId),
    );
  }

  private addListShopItem(item: ListShopItem) {
    this.state.listItemShop.update((items) => [item, ...items]);
  }

  //.- Data management

  async getStores(): Promise<Store[]> {
    const stores = (await this.dataService.getData<Store[]>('stores')) ?? [];

    this.state.stores.set(stores);

    return stores;
  }

  async getStoreBy(storeId: string): Promise<Store | undefined> {
    const stores = await this.getStores();
    return stores.find((store) => store.id === storeId);
  }

  async saveListShopOnDrafts() {
    this.deleteEmptyItem();

    await this.saveDraft();

    await this.dataManager.saveListShopOnDrafts();
    this.returnHome();
  }

  async saveDraft() {
    const list = await this.dataManager.saveDraftList();

    this.state.currentDraft.set(list);
  }

  async getDrafts(): Promise<void> {
    const drafts = await this.dataManager.getDrafts();

    this.state.listDrafts.set(drafts);
  }

  //.- Dialogs

  async openListConfig(): Promise<ListShopConfig | undefined> {
    console.log(
      '%ctodo: Manejar cuando no haya tiendas',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    return this.dialogService.openListConfig(this.state.stores);
  }

  async openDraftConfig(): Promise<ListShop | undefined> {
    console.log(
      '%ctodo: Manejar cuando no haya draft',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    this.getDrafts();
    return this.dialogService.openDraftConfig(this, this.state);
  }

  async hanldeExit() {
    const exit = await this.dialogService.hanldeExit();

    if (exit) {
      this.returnHome();
    }
  }

  async openFinishShopConfirmation() {
    return this.dialogService.openFinishShopConfirmation();
  }

  async openItemForm(item?: ListShopItem) {
    const newItem = await this.dialogService.openItemForm(this, item);

    return newItem;
  }

  //.- Private
  private resetListShopState() {
    this.state.reset();
    this.dataManager.reset();
  }

  private deleteEmptyItem() {
    this.state.listItemShop.update((items) =>
      items.filter((item) => item.quantity !== 0),
    );
  }
}
