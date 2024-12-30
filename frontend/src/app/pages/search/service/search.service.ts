import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { AppStorageService, DEFAULT_STORE, OrderState } from 'src/app/shared';
import { ListShop } from '../../list-shop';
import { Store } from '../../tiendas/models';
import { SEARCH_PRODUCT_SORTERS } from '../constants/search-sorts';
import {
  SearchProduct,
  SortSearchProductKey,
  SortSearchProductState,
} from '../model/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly storageService = inject(AppStorageService);
  private products = signal<SearchProduct[]>([]);
  public searchProducts = linkedSignal(() => this.products());
  private sortState: SortSearchProductState = {
    name: OrderState.Ascending,
    price: OrderState.Unsorted,
    shopDate: OrderState.Unsorted,
  };

  public async loadProducts() {
    const archives = await this.getArchives();
    const products = archives.flatMap((archive) =>
      this.generateSearchProduct(archive),
    );
    this.products.set(
      SEARCH_PRODUCT_SORTERS.name(products, OrderState.Ascending),
    );
  }

  public async getStoreById(storeId: string): Promise<Store> {
    const store = await this.storageService.getStoreById(storeId);
    if (!store) {
      console.error('Store not found');
      return DEFAULT_STORE;
    }
    return store;
  }

  public search(term: string) {
    let products = this.products();

    if (term) {
      const search = term.toLowerCase();
      products = products.filter(({ name }) =>
        name.toLowerCase().includes(search),
      );
    }
    products = this.sortProducts(products);
    this.searchProducts.set(products);
  }

  public sort(value: OrderState, key: keyof SortSearchProductKey) {
    this.sortState[key] = value;
    let products = this.sortProducts(this.searchProducts());
    this.searchProducts.set(products);
  }

  private async getArchives(): Promise<ListShop[]> {
    const archives = await this.storageService.getArchives();
    return archives;
  }

  private generateSearchProduct({
    items,
    shopDate,
    storeId,
  }: ListShop): SearchProduct[] {
    return items.map((item) => ({ ...item, storeId, shopDate }));
  }

  private sortProducts(products: SearchProduct[]): SearchProduct[] {
    const keys = Object.keys(this.sortState) as (keyof SortSearchProductKey)[];

    for (const key of keys) {
      products = SEARCH_PRODUCT_SORTERS[key](products, this.sortState[key]);
    }

    return products;
  }
}
