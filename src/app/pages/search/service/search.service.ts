import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { AppStorageService, DEFAULT_STORE } from 'src/app/shared';
import { ListShop } from '../../list-shop';
import { Store } from '../../tiendas/models';
import { SearchProduct } from '../model/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly storageService = inject(AppStorageService);
  private products = signal<SearchProduct[]>([]);
  public searchProducts = linkedSignal(() => this.products());

  public async loadProducts() {
    const archives = await this.getArchives();
    const products = archives.flatMap((archive) =>
      this.generateSearchProduct(archive),
    );
    this.products.set(products.sort((a, b) => a.name.localeCompare(b.name)));
  }

  public async getStoreById(storeId: string): Promise<Store> {
    const store = await this.storageService.getStoreById(storeId);
    if (!store) {
      console.error('Store not found');
      return DEFAULT_STORE;
    }
    return store;
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
}
