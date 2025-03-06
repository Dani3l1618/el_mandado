import { inject, Injectable } from '@angular/core';
import { ComputeService, DataService, DateService } from 'src/app/shared';
import {
  ListShop,
  ListShopCurrentDraft,
  ListShopDraft,
  ListShopMode,
} from '../models/list-shop.model';
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

  public async storeListShopOnDrafts(mode: ListShopMode) {
    if (!this.currentDraft()[mode]) return;
    const draft = this.currentDraft()[mode]!;

    let drafts = await this.getDrafts();

    if (mode === 'new') {
      drafts = [draft, ...drafts];
    } else if (mode === 'draft') {
      drafts = drafts.map((item) => (item.id === draft.id ? draft : item));
    }

    await this.dataService.saveData('drafts', drafts);
    await this.updateCurrentDraft(mode, null);
  }

  public async saveDraftList(): Promise<ListShop> {
    const infoList: ListShopDraft = {
      items: this.state.listItemShop(),
      storeConfig: this.state.storeConfig()!,
      total: this.state.listShopTotal(),
      time: this.state.timeInStore(),
    };
    const mode = this.state.mode();

    const list = this.generateListShop(infoList, this.currentDraft()[mode]);

    this.updateCurrentDraft(mode, list);
    return list;
  }

  public async getDraftList(mode: ListShopMode): Promise<ListShop | null> {
    const currentDrafts = await this.getCurrentDraftList();

    return currentDrafts ? currentDrafts[mode] : currentDrafts;
  }

  public async getCurrentDraftList(): Promise<ListShopCurrentDraft | null> {
    return await this.dataService.getData<ListShopCurrentDraft>('currentDraft');
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

  public async updateCurrentDraft(mode: ListShopMode, item: ListShop | null) {
    this.state.updateCurrentDraft(mode, item);
    this.dataService.saveData('currentDraft', this.state.currentDraft());
  }

  private generateListShop(
    { storeConfig, items, total, time }: ListShopDraft,
    currentDraft: ListShop | null,
  ): ListShop {
    const id = currentDraft?.id ?? this.dataService.generateId();
    const shopDate = currentDraft?.shopDate ?? this.dateService.newDate();
    const name = this.computeService.generateDateName(
      storeConfig.store.chain,
      new Date(shopDate),
    );
    const storeId = storeConfig.store.id ?? '';
    const budget = storeConfig.budget ?? 0;

    return { id, name, shopDate, storeId, budget, total, items, time };
  }

  resetCurrentDraft() {
    const mode = this.state.mode();
    this.updateCurrentDraft(mode, null);
  }
}
