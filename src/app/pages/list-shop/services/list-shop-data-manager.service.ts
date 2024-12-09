import { inject, Injectable } from '@angular/core';
import { ComputeService, DataService } from 'src/app/shared';
import { ListShop, ListShopDraft } from '../models/list-shop.model';
import { ListShopStateService } from './list-shop-state.service';

@Injectable()
export class ListShopDataManagerService {
  private dataService = inject(DataService);
  private state = inject(ListShopStateService);
  private computeService = inject(ComputeService);

  private currentDraft = this.state.currentDraft.asReadonly();

  async getDrafts(): Promise<ListShop[]> {
    return (await this.dataService.getData('drafts')) ?? [];
  }

  public async saveListShopOnDrafts() {
    if (!this.currentDraft()) return;

    const drafts = await this.getDrafts();

    await this.dataService.saveData('drafts', [this.currentDraft(), ...drafts]);
  }

  public async saveDraftList(): Promise<ListShop> {
    const infoList: ListShopDraft = {
      items: this.state.listItemShop(),
      storeConfig: this.state.storeConfig()!,
      total: this.state.listShopTotal(),
      time: this.state.timeInStore(),
    };

    const list = this.generateListShop(infoList);

    await this.dataService.saveData('currentDraft', list);

    return list;
  }

  private generateListShop({
    storeConfig,
    items,
    total,
    time,
  }: ListShopDraft): ListShop {
    const id = this.currentDraft()?.id ?? this.dataService.generateId();
    const name =
      this.currentDraft()?.name ??
      this.computeService.generateDateName(storeConfig.store.chain);
    const shopDate = new Date().toJSON();
    const storeId = storeConfig.store.id ?? '';
    const budget = storeConfig.budget ?? 0;

    return { id, name, shopDate, storeId, budget, total, items, time };
  }

  reset() {
    this.dataService.removeData('currentDraft');
  }
}
