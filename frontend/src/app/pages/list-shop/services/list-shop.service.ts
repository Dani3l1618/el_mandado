import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/AppRoutes';
import { DataService, NOTIFY_MESSAGES } from 'src/app/shared';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Store } from '../../tiendas/models';
import { LS_MODE } from '../constants/list-shop.config';
import {
  ListShop,
  ListShopConfig,
  ListShopItem,
  ListShopItemForm,
  ListShopMode,
} from '../models/list-shop.model';
import { ListShopDataManagerService } from './list-shop-data-manager.service';
import { ListShopDialogsService } from './list-shop-dialogs.service';
import { ListShopStateService } from './list-shop-state.service';

@Injectable()
export class ListShopService {
  private router = inject(Router);
  private dataService = inject(DataService);
  private route = inject(ActivatedRoute);

  private dataManager = inject(ListShopDataManagerService);
  private dialogService = inject(ListShopDialogsService);
  private state = inject(ListShopStateService);
  private notify = inject(NotifyService);

  constructor() {
    const url = this.router.url;
    this.state.mode.set(this.getMode(url));
  }

  returnHome() {
    this.resetListShopState();
    this.router.navigate([AppRoutes.home]);
  }

  returnHistory() {
    this.resetListShopState();
    this.router.navigate([AppRoutes.history]);
  }

  async initNewMode(): Promise<void> {
    const currentDraft = await this.retrieveCurrentDraft('new');
    if (currentDraft) {
      return this.setCurrentDraft(currentDraft);
    }
    await this.getStores();
    const storeConfig = await this.openListConfig();

    if (!storeConfig) {
      this.returnHome();
      return;
    }

    this.state.storeConfig.set(storeConfig);
  }

  async initDraftMode(): Promise<void> {
    const drafts = await this.getDrafts();
    let listOnEdit: ListShop | undefined = undefined;
    const currentDraft = await this.retrieveCurrentDraft('draft');

    if (currentDraft) {
      return this.setCurrentDraft(currentDraft);
    }

    if (drafts.length === 1) {
      listOnEdit = drafts.at(0);
      this.notify.notify({
        message: NOTIFY_MESSAGES.oneDraftMessage,
      });
    } else {
      listOnEdit = await this.openDraftConfig();
    }

    if (!listOnEdit) {
      this.returnHome();
      return;
    }

    this.setCurrentDraft(listOnEdit);
  }

  async initViewMode() {
    const listShopId = this.route.snapshot.paramMap.get('id');

    if (!listShopId) return this.returnHome();

    const archiveList = await this.dataManager.getArchiveById(listShopId);

    this.state.listOnEdit.set(archiveList);

    this.setListShop(archiveList);
  }

  async editListConfig() {
    const newListConfig = await this.openListConfig(true);

    if (!newListConfig) return;

    this.state.storeConfig.set(newListConfig);
  }

  async setCurrentDraft(currentDraft: ListShop) {
    this.state.listOnEdit.set(currentDraft);
    this.setListShop(currentDraft);
  }

  async retrieveCurrentDraft(mode: ListShopMode): Promise<ListShop | null> {
    const currentDraft = await this.dataManager.getDraftList(mode);

    const showDialog = !!currentDraft && this.state.mode() === mode;

    if (showDialog) {
      const wantRetrieve = await this.dialogService.openRetrieveDraftDialog();
      if (wantRetrieve) return currentDraft;

      this.dataManager.updateCurrentDraft(mode, null);
    }

    return null;
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
    const mode = this.state.mode();

    await this.saveDraft();

    if (mode === 'new' || mode === 'draft') {
      await this.dataManager.storeListShopOnDrafts(mode);
    }

    this.returnHome();
  }

  async saveDraft() {
    await this.dataManager.saveDraftList();
  }

  async getDrafts(): Promise<ListShop[]> {
    const drafts = await this.dataManager.getDrafts();

    this.state.listDrafts.set(drafts);

    return drafts;
  }

  //.- Dialogs

  private async openListConfig(
    editMode = false,
  ): Promise<ListShopConfig | undefined> {
    const listConfig = editMode
      ? this.state.storeConfig.asReadonly()
      : signal(undefined);

    return this.dialogService.openListConfig(this.state.stores, listConfig);
  }

  private async openDraftConfig(): Promise<ListShop | undefined> {
    return this.dialogService.openDraftConfig(this.state);
  }

  async hanldeExit() {
    const mode = this.state.mode();
    const exit = await this.dialogService.hanldeExit(mode);

    if (exit) {
      this.returnHome();
    }
  }

  async openFinishShopConfirmation() {
    return this.dialogService.openFinishShopConfirmation(this.state.mode());
  }

  async openItemForm(item?: ListShopItem) {
    const newItem = await this.dialogService.openItemForm(this, item);

    return newItem;
  }

  //.- Draft mode config

  private async setListShop(listShop: ListShop) {
    const listOnEdit = listShop;

    const { budget, storeId, items, time } = listOnEdit;
    const store = await this.getStoreBy(storeId);
    const mode = this.state.mode();

    if (!store) return;

    this.state.storeConfig.set({ budget, store });
    this.state.listItemShop.set(items);
    this.state.timeInStore.set(time);
    this.dataManager.updateCurrentDraft(mode, listOnEdit);
  }

  public async archiveDraft() {
    const confirmation = await this.dialogService.openArchiveShopConfirmation();
    if (!confirmation) return;

    this.dataManager.archiveList();
    this.returnHome();
  }

  public async deleteDraft() {
    const confirmation = await this.dialogService.openDeleteDraftConfirmation();

    if (!confirmation) return;

    await this.dataManager.deleteDraftOfList(this.state.listOnEdit()!.id);
    this.returnHome();
  }

  //.- Private
  private resetListShopState() {
    this.dataManager.resetCurrentDraft(); //primero actualiza el currentDraft  con el mode y
    this.state.reset(); //después actualiza el mode a none
  }

  private deleteEmptyItem() {
    this.state.listItemShop.update((items) =>
      items.filter((item) => item.quantity !== 0),
    );
  }

  private getMode(url: string): ListShopMode {
    const modes = Object.keys(LS_MODE);
    const mode = modes.find((m) => url.includes(m)) ?? 'new-list';

    return LS_MODE[mode];
  }
}
