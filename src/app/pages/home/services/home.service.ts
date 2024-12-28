import { inject, Injectable, signal, Signal } from '@angular/core';
import { AppStorageService } from 'src/app/shared';
import { ListShop } from '../../list-shop';
import {
  HOME_CARD_NULL_INFO,
  HOME_CARDS,
} from '../constants/home-cards.config';
import { HomeCardInfo, HomeRows } from '../models/home-card.model';
import { HomeListItem } from '../models/home-list.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly appStorage = inject(AppStorageService);
  public homeInfoCards = signal<HomeRows[]>(HOME_CARDS(HOME_CARD_NULL_INFO));

  public async getResume(): Promise<void> {
    const info = await this.getCardInfo();
    const rows: HomeRows[] = HOME_CARDS(info);
    this.homeInfoCards.set(rows);
  }

  getListItems(): Signal<HomeListItem[]> {
    const items: HomeListItem[] = [
      {
        title: 'Total gastado',
        label: '6 meses',
        data: '12560',
        icon: 'list',
        id: 1,
        pipe: 'currency',
      },
      {
        title: 'Gasto mensual',
        label: 'promedio',
        data: '4560',
        icon: 'wallet',
        id: 2,
        pipe: 'currency',
      },
      {
        title: 'Tiempo',
        label: 'promedio',
        data: '4560',
        icon: 'time',
        id: 3,
        pipe: 'time',
      },
    ];
    return signal(items);
  }

  private async getCardInfo(): Promise<HomeCardInfo> {
    const lastArchive = await this.getLastArchive();
    if (!lastArchive) return HOME_CARD_NULL_INFO;

    const info: HomeCardInfo = {
      expensive: [this.getExpensiveItem(lastArchive)],
    };

    return HOME_CARD_NULL_INFO;
  }

  private async getLastArchive(): Promise<ListShop | undefined> {
    const archives = await this.appStorage.getArchives();
    const lastArchive = archives.sort(
      (a, b) => new Date(a.shopDate).getTime() - new Date(b.shopDate).getTime(),
    );
    return lastArchive.at(-1);
  }

  private getExpensiveItem(list: ListShop): string {
    const prices = list.items.map((item) => item.price);
    return `${Math.max(...prices)}`;
  }
}
