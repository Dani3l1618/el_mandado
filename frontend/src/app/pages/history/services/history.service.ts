import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { DataService, DateService } from 'src/app/shared';
import { ListShop } from '../../list-shop';
import { Store } from '../../tiendas/models';
import { HistoryFilter } from '../models/history-filter.model';

@Injectable()
export class HistoryService {
  private dataService = inject(DataService);
  private dateService = inject(DateService);
  private router = inject(Router);
  #shoplist = signal<ListShop[]>([]);

  shopList = signal<ListShop[]>([]);
  stores = signal<Store[]>([]);
  minDateOfShopping = computed(() => this.getMinDate(this.#shoplist()));

  async getArchiveLists() {
    const lists =
      (await this.dataService.getData<ListShop[]>('archives')) ?? [];
    this.#shoplist.set(lists);
    this.shopList.set(lists);
  }

  async getStoreById(id: string): Promise<Store | undefined> {
    const stores = await this.loadStores();
    return stores.find((s) => s.id === id);
  }

  async loadStores(): Promise<Store[]> {
    if (this.stores().length > 0) return this.stores();

    const stores = (await this.dataService.getData<Store[]>('stores')) ?? [];
    this.stores.set(stores);

    return stores;
  }

  filterShopList({ storeId, startDate, endDate }: HistoryFilter) {
    let listFiltered = [...this.#shoplist()];

    if (storeId) {
      listFiltered = listFiltered.filter((list) => list.storeId === storeId);
    }

    if (startDate) {
      listFiltered = listFiltered.filter(
        (list) =>
          new Date(list.shopDate) >=
          new Date(this.dateService.setToMidnight(startDate)),
      );
    }

    if (endDate) {
      listFiltered = listFiltered.filter(
        (list) =>
          new Date(list.shopDate) <=
          new Date(this.dateService.setToEndDate(endDate)),
      );
    }

    this.shopList.set(listFiltered);
  }

  navigateToDetail(id: string) {
    this.router.navigateByUrl(AppRoutes.viewList.replace(':id', id), {
      replaceUrl: false,
    });
  }

  returnHome() {
    this.router.navigate([AppRoutes.menu]);
  }

  private getMinDate(list: ListShop[]): string {
    let minDate = new Date().toISOString();

    if (list.length > 0) {
      minDate = list.reduce((min, list) => {
        const date = new Date(list.shopDate);
        return date < new Date(min) ? list.shopDate : min;
      }, list[0].shopDate);
    }

    return this.dateService.formatUTC(minDate);
  }
}
