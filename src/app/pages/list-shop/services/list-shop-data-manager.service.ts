import { computed, inject, Injectable, signal } from '@angular/core';
import { ComputeService, DataService } from 'src/app/shared';
import { ListShop, ListShopDraft } from '../models/list-shop.model';

@Injectable()
export class ListShopDataManagerService {
  private dataService = inject(DataService);
  private computeService = inject(ComputeService);

  currentDraft = signal<ListShop | null>(null);
  listSaved = computed(() => this.currentDraft() !== null);

  async getDrafts(): Promise<ListShop[]> {
    return (await this.dataService.getData('drafts')) ?? [];
  }

  public async saveListShopOnDrafts() {
    if (!this.currentDraft()) return;

    const drafts = await this.getDrafts();

    await this.dataService.saveData('drafts', [this.currentDraft(), ...drafts]);
  }

  public async saveDraftList(infoList: ListShopDraft): Promise<void> {
    const list = this.generateListShop(infoList);

    await this.dataService.saveData('currentDraft', list);

    this.currentDraft.set(list);
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
    this.currentDraft.set(null);
    this.dataService.removeData('currentDraft');
  }
}
