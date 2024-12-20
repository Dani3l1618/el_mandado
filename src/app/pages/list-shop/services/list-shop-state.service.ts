import { computed, Injectable, signal } from '@angular/core';
import { Store } from '../../tiendas/models';
import {
  ListShop,
  ListShopConfig,
  ListShopItem,
  ListShopMode,
} from '../models/list-shop.model';

@Injectable()
export class ListShopStateService {
  mode = signal<ListShopMode>('new');

  stores = signal<Store[]>([]);
  storeConfig = signal<ListShopConfig | undefined>(undefined);

  listItemShop = signal<ListShopItem[]>([]);
  timeInStore = signal(0);
  listShopTotal = computed(() => this.totalListShop(this.listItemShop()));

  listDrafts = signal<ListShop[]>([]);
  currentDraft = signal<ListShop | null>(null);
  listSaved = computed(() => this.currentDraft() !== null);

  listOnEdit = signal<ListShop | null>(null);

  private totalListShop(listShop: ListShopItem[]): number {
    return listShop.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  public reset() {
    this.storeConfig.set(undefined);
    this.stores.set([]);
    this.listItemShop.set([]);
    this.currentDraft.set(null);
  }
}
