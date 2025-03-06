import { computed, Injectable, signal } from '@angular/core';
import { Store } from '../../tiendas/models';
import { INITIAL_CURRENT_DRAFT } from '../constants/list-shop.config';
import {
  ListShop,
  ListShopConfig,
  ListShopCurrentDraft,
  ListShopItem,
  ListShopMode,
} from '../models/list-shop.model';

@Injectable({
  providedIn: 'root',
})
export class ListShopStateService {
  mode = signal<ListShopMode>('none');

  stores = signal<Store[]>([]);
  storeConfig = signal<ListShopConfig | undefined>(undefined);

  listItemShop = signal<ListShopItem[]>([]);
  timeInStore = signal(0);
  listShopTotal = computed(() => this.totalListShop(this.listItemShop()));

  listDrafts = signal<ListShop[]>([]);
  currentDraft = signal<ListShopCurrentDraft>(INITIAL_CURRENT_DRAFT);
  listSaved = computed(() => this.currentDraft() !== null);

  listOnEdit = signal<ListShop | null>(null);

  private totalListShop(listShop: ListShopItem[]): number {
    return listShop.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  public updateCurrentDraft(mode: ListShopMode, list: ListShop | null) {
    this.currentDraft.update((current) => ({ ...current, [mode]: list }));
  }

  public reset() {
    this.storeConfig.set(undefined);
    this.stores.set([]);
    this.listItemShop.set([]);
    this.mode.set('none');
  }
}
