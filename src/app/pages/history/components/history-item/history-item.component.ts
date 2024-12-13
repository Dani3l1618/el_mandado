import { Component, input } from '@angular/core';
import { IonItem } from '@ionic/angular/standalone';
import { ListShop } from 'src/app/pages/list-shop';

const imports = [IonItem];
@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
  standalone: true,
  imports,
})
export class HistoryItemComponent {
  list = input.required<ListShop>();
}
