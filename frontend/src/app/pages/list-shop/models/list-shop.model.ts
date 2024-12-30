import { Store } from '../../tiendas/models';

export type ListShopMode = 'new' | 'draft' | 'view';

export interface ListShopConfig {
  store: Store;
  budget: number;
}

export interface ListShop {
  id: string;
  name: string; //19-11-2024-Soriana
  items: ListShopItem[];
  shopDate: string;
  storeId: string;
  budget: number;
  total: number;
  time: number; //Seconds
}

export interface ListShopDraft {
  storeConfig: ListShopConfig;
  items: ListShopItem[];
  total: number;
  time: number; //seconds
}

export interface ListShopItem {
  barcode?: string;
  name: string;
  quantity: number;
  price: number;
  id: string;
}

export type ListShopItemForm = Omit<ListShopItem, 'id'>;

