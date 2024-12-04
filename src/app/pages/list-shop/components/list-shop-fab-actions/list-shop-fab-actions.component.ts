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
    if (this.listShopService.listItemShop().length === 0) return;
    this.listShopService.saveDraft();
  }
  
  async onDone() {
    if (this.listShopService.listItemShop().length === 0) return;
    const finish = await this.listShopService.openFinishShopConfirmation();

    if (!finish) {
      return this.onSave();
    }

    this.listShopService.saveListShopOnDrafts();

  }
}
