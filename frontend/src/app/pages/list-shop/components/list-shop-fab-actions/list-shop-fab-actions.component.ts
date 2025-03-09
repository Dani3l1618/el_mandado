import { Component, inject, viewChild } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';
import { ListShopStateService } from '../../services/list-shop-state.service';
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
  private state = inject(ListShopStateService);

  private readonly fabButton = viewChild(IonFab);
  listItemShop = this.state.listItemShop.asReadonly();
  mode = this.state.mode.asReadonly();

  closeFabButton() {
    this.fabButton()?.close();
  }

  onExit() {
    this.listShopService.hanldeExit();
  }

  async onDone() {
    if (this.listItemShop().length === 0) return;
    const finish = await this.listShopService.openFinishShopConfirmation();

    if (finish) this.listShopService.saveListShopOnDrafts();
  }

  onArchive() {
    this.listShopService.archiveDraft();
  }

  onDelete() {
    this.listShopService.deleteDraft();
  }

  onEdit() {
    this.listShopService.editListConfig();
  }
}
