import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input, resource } from '@angular/core';
import { IonItem } from '@ionic/angular/standalone';
import { ListShop } from 'src/app/pages/list-shop';
import { StoreMedia } from 'src/app/shared';
import { SharedStoreImgComponent } from 'src/app/shared/components/shared-store-img/shared-store-img.component';
import { HistoryService } from '../../services/history.service';

const imports = [IonItem, DatePipe, CurrencyPipe, SharedStoreImgComponent];
@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
  standalone: true,
  imports,
})
export class HistoryItemComponent {
  private historyService = inject(HistoryService);

  readonly list = input.required<ListShop>();

  readonly store = resource({
    request: this.list,
    loader: async ({ request: list }) =>
      await this.historyService.getStoreById(list.storeId),
  });

  readonly defaultImg: StoreMedia = StoreMedia.none;
}
