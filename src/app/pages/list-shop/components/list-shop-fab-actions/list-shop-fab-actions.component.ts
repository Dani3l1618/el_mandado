import { Component, inject } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';
import { ListShopService } from '../../services/list-shop.service';

const imports = [IonFab, IonFabButton, IonFabList, IonIcon];

@Component({
  selector: 'app-list-shop-fab-actions',
  templateUrl: './list-shop-fab-actions.component.html',
  styleUrls: ['./list-shop-fab-actions.component.scss'],
  standalone: true,
  imports,
})
export class ListShopFabActionsComponent {
  private listShopService = inject(ListShopService);

  onExit() {
    this.listShopService.hanldeExit();
  }

  onSave() {
    console.log(
      '%ctodo: No hacer nada sino hay items',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    console.log('save');
  }

  onDone() {
    console.log(
      '%ctodo: No hacer nada sino hay items',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    console.log('done');
  }
}
