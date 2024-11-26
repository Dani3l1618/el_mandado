import { Store } from '../../tiendas/models';

export interface ListShopConfig {
  store: Store;
  budget: number;
}

export interface ListShop {
  id: string;
  name: string; //19-11-2024-Soriana
  items: ListShopItem[];
  shopDate: Date;
  storeId: string;
  budget: number;
  total: number;
}

export interface ListShopItem {
  barcode?: string;
  name: string;
  quantity: number;
  price: number;
  id: string;
}

export type ListShopItemForm = Omit<ListShopItem, 'id'>;
