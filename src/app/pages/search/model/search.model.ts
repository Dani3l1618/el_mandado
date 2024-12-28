import { OrderState } from 'src/app/shared';
import { ListShopItem } from '../../list-shop';

export interface SearchProduct extends ListShopItem {
  shopDate: string;
  storeId: string;
}

export type SortSearchProductKey = Pick<
  SearchProduct,
  'price' | 'shopDate' | 'name'
>;

export type SortSearchProductState = Record<
  keyof SortSearchProductKey,
  OrderState
>;
