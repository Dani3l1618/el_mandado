import { OrderState, SortFunction } from 'src/app/shared';
import { SearchProduct, SortSearchProductKey } from '../model/search.model';

const sortByName: SortFunction<SearchProduct> = (
  products: SearchProduct[],
  order: OrderState,
) => {
  if (order === OrderState.Descending)
    return products.sort((a, b) => b.name.localeCompare(a.name));

  return products.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPrice: SortFunction<SearchProduct> = (
  products: SearchProduct[],
  order: OrderState,
) => {
  if (order === OrderState.Unsorted) return products;

  if (order === OrderState.Descending)
    return products.sort((a, b) => b.price - a.price);

  return products.sort((a, b) => a.price - b.price);
};

const sortByDate: SortFunction<SearchProduct> = (
  products: SearchProduct[],
  order: OrderState,
) => {
  if (order === OrderState.Unsorted) return products;

  if (order === OrderState.Descending)
    return products.sort(
      (a, b) => new Date(b.shopDate).getTime() - new Date(a.shopDate).getTime(),
    );

  return products.sort(
    (a, b) => new Date(a.shopDate).getTime() - new Date(b.shopDate).getTime(),
  );
};

export const SEARCH_PRODUCT_SORTERS: Record<
  keyof SortSearchProductKey,
  SortFunction<SearchProduct>
> = {
  price: sortByPrice,
  shopDate: sortByDate,
  name: sortByName,
};
