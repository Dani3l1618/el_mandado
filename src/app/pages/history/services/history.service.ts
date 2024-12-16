import { inject, Injectable, signal } from '@angular/core';
import { DataService } from 'src/app/shared';
import { ListShop } from '../../list-shop';
import { Store } from '../../tiendas/models';

@Injectable()
export class HistoryService {
  private dataService = inject(DataService);

  shopList = signal<ListShop[]>([]);

  async getArchiveLists() {
    const lists =
      (await this.dataService.getData<ListShop[]>('archives')) ?? [];

    this.shopList.set(lists);
  }

  async getStoreById(id: string): Promise<Store | undefined> {
    const stores = (await this.dataService.getData<Store[]>('stores')) ?? [];

    return stores.find((s) => s.id === id);
  }
}
