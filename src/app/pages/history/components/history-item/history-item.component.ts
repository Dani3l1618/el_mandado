import { Component, computed, inject, input } from '@angular/core';
import { IonItem } from '@ionic/angular/standalone';
import { ListShop } from 'src/app/pages/list-shop';
import { HistoryService } from '../../services/history.service';

const imports = [IonItem];
@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
  standalone: true,
  imports,
})
export class HistoryItemComponent {
  private historyService = inject(HistoryService);

  list = input.required<ListShop>();

  store = computed(
    async () => await this.historyService.getStoreById(this.list().id),
  );
}
