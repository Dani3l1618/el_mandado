import { ListShopItem } from '../../list-shop';

export interface SearchProduct extends ListShopItem {
  shopDate: string;
  storeId: string;
}
