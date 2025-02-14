import { inject, Injectable, signal } from '@angular/core';
import { App } from '@capacitor/app';
import { addMonths, compareAsc, startOfToday } from 'date-fns';
import { AppRoutes } from 'src/app/AppRoutes';
import {
  AppStorageService,
  ComputeService,
  ModalService,
  NavigateService,
  SharedConfirmDialogComponent,
} from 'src/app/shared';
import { ListShop, ListShopItem } from '../../list-shop';
import {
  HOME_CARD_NULL_INFO,
  HOME_CARDS,
  HOME_CONFIRM_EXIT_DIALOG,
  HOME_LIST,
} from '../constants/home-cards.config';
import { HomeCardInfo, HomeRows } from '../models/home-card.model';
import { HomeListItem } from '../models/home-list.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly appStorage = inject(AppStorageService);
  private readonly computeService = inject(ComputeService);
  private readonly navigateService = inject(NavigateService);
  private readonly modalService = inject(ModalService);
  private readonly MONTH_AGO = 6;
  public homeInfoCards = signal<HomeRows[]>(HOME_CARDS(HOME_CARD_NULL_INFO));
  public homeInfoList = signal<HomeListItem[]>(HOME_LIST([0, 0, 0]));

  public async getResume(): Promise<void> {
    const info = await this.getCardInfo();
    const rows: HomeRows[] = HOME_CARDS(info);
    this.homeInfoCards.set(rows);
  }

  public async getListItems(): Promise<void> {
    const info = await this.getListInfo();

    this.homeInfoList.set(HOME_LIST(info));
  }

  public navigateTo(url: AppRoutes) {
    this.navigateService.navigateTo(url);
  }

  public async openConfirmExit(): Promise<void> {
    const componentProps = HOME_CONFIRM_EXIT_DIALOG;

    const exit = await this.modalService.openModal({
      component: SharedConfirmDialogComponent,
      componentProps,
      cssClass: 'modal-25',
    });

    if (exit) {
      App.exitApp();
    }
  }

  private async getCardInfo(): Promise<HomeCardInfo> {
    const lastArchive = await this.getLastArchive();
    if (!lastArchive) return HOME_CARD_NULL_INFO;

    const store = await this.appStorage.getStoreById(lastArchive.storeId);

    const getItem = (items: ListShopItem[]): [string, string] | null => {
      if (items.length === 0) return null;

      const index = Math.floor(Math.random() * items.length);
      const item = items[index];

      return [item.name, String(item.price)];
    };

    const info: HomeCardInfo = {
      expensive: () => getItem(lastArchive.items),
      totalShop: () => [lastArchive.total.toString()],
      location: () => [lastArchive.shopDate, `\n${store!.chain}`],
      totalItems: () => [lastArchive.items.length.toString()],
    };

    return info;
  }

  private async getListInfo(): Promise<[number, number, number]> {
    const archives = await this.appStorage.getArchives();
    const totalMonthsAgo = this.getTotalLastMonths(archives);
    const avgTotal = this.getAverageTotal(archives);
    const avgTimes = this.getAverageTime(archives);

    return [totalMonthsAgo, avgTotal, avgTimes];
  }

  private async getLastArchive(): Promise<ListShop | undefined> {
    const archives = await this.appStorage.getArchives();
    const lastArchive = archives.sort(
      (a, b) => new Date(a.shopDate).getTime() - new Date(b.shopDate).getTime(),
    );
    return lastArchive.at(-1);
  }

  private getTotalLastMonths(
    archives: ListShop[],
    monthAgo = this.MONTH_AGO,
  ): number {
    const dateAgo = addMonths(startOfToday(), -1 * monthAgo);
    const totals = archives
      .filter(({ shopDate }) => compareAsc(new Date(shopDate), dateAgo) === 1)
      .map((item) => item.total);

    return totals.reduce((p, c) => p + c, 0);
  }

  private getAverageTotal(archives: ListShop[]): number {
    const totals = archives.map((item) => item.total);

    return this.computeService.getAverage(...totals);
  }

  private getAverageTime(archives: ListShop[]): number {
    const times = archives.map((item) => item.time);
    return this.computeService.getAverage(...times);
  }
}
