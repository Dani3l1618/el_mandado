import { Component, inject } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { HistoryService } from '../../services/history.service';
import { HistoryItemComponent } from '../history-item/history-item.component';

const imports = [IonList, HistoryItemComponent];

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  standalone: true,
  imports,
})
export class HistoryListComponent {
  private historyService = inject(HistoryService);

  list = this.historyService.shopList.asReadonly();
}
