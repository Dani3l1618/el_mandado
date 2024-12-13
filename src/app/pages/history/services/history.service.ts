import { inject, Injectable, signal } from '@angular/core';
import { DataService } from 'src/app/shared';
import { ListShop } from '../../list-shop';

@Injectable()
export class HistoryService {
  private dataService = inject(DataService);

  shopList = signal<ListShop[]>([]);

  async getArchiveLists() {
    const lists =
      (await this.dataService.getData<ListShop[]>('archives')) ?? [];

    this.shopList.set(lists);
  }
}
