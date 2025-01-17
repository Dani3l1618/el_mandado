import { inject, Injectable } from '@angular/core';
import { ComputeService, DataService, DateService } from 'src/app/shared';
import { ListShop, ListShopDraft } from '../models/list-shop.model';
import { ListShopStateService } from './list-shop-state.service';

@Injectable()
export class ListShopDataManagerService {
  private dataService = inject(DataService);
  private state = inject(ListShopStateService);
  private computeService = inject(ComputeService);
  private dateService = inject(DateService);
  private currentDraft = this.state.currentDraft.asReadonly();

  async getDrafts(): Promise<ListShop[]> {
    return (await this.dataService.getData('drafts')) ?? [];
  }

  public async saveListShopOnDrafts() {
    if (!this.currentDraft()) return;

    const drafts = await this.getDrafts();

    await this.dataService.saveData('drafts', [this.currentDraft(), ...drafts]);
  }

  public async updateListShopOnDrafts() {
    if (!this.currentDraft()) return;

    const drafts = await this.getDrafts();
    const updatedDrafts = drafts.map((item) =>
      item.id === this.currentDraft()!.id ? this.currentDraft()! : item,
    );

    await this.dataService.saveData('drafts', updatedDrafts);
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

  public async deleteDraftOfList(id: string) {
    const drafts = await this.getDrafts();
    const newDrafts = drafts.filter((item) => item.id !== id);

    await this.dataService.saveData('drafts', newDrafts);
  }

  public async archiveList() {
    const listShop = await this.saveDraftList();

    const oldArchives = await this.getArchives();
    const newArchives = [listShop, ...oldArchives];

    await this.dataService.saveData('archives', newArchives);
    await this.deleteDraftOfList(listShop.id);
  }

  public async getArchives(): Promise<ListShop[]> {
    const history =
      (await this.dataService.getData<ListShop[]>('archives')) ?? [];

    return history;
  }

  public async getArchiveById(id: string): Promise<ListShop> {
    const history = await this.getArchives();

    return history.find((item) => item.id === id)!;
  }

  private generateListShop({
    storeConfig,
    items,
    total,
    time,
  }: ListShopDraft): ListShop {
    const id = this.currentDraft()?.id ?? this.dataService.generateId();
    const shopDate =
      this.currentDraft()?.shopDate ?? this.dateService.newDate();
    const name = this.computeService.generateDateName(
      storeConfig.store.chain,
      new Date(shopDate),
    );
    const storeId = storeConfig.store.id ?? '';
    const budget = storeConfig.budget ?? 0;

    return { id, name, shopDate, storeId, budget, total, items, time };
  }

  reset() {
    this.dataService.removeData('currentDraft');
  }
}
