import { inject, Injectable } from '@angular/core';
import { ListShop } from 'src/app/pages/list-shop';
import { Store } from 'src/app/pages/tiendas/models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private readonly dataService = inject(DataService);

  public async getStores(): Promise<Store[]> {
    const stores = await this.dataService.getData<Store[]>('stores');

    return stores || [];
  }

  public async getStoreById(storeId: string): Promise<Store | null> {
    const stores = await this.getStores();
    const store = stores.find((store) => store.id === storeId);

    return store || null;
  }

  public async getArchives(): Promise<ListShop[]> {
    const archives = await this.dataService.getData<ListShop[]>('archives');

    return archives || [];
  }

  public async getDrafts(): Promise<ListShop[]> {
    const drafts = await this.dataService.getData<ListShop[]>('drafts');

    return drafts || [];
  }
}
