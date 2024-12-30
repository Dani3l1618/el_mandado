import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { SharedFabComponent } from 'src/app/shared';
import { ListShopEmptyComponent } from './components/list-shop-empty/list-shop-empty.component';
import { ListShopFabActionsComponent } from './components/list-shop-fab-actions/list-shop-fab-actions.component';
import { ListShopFooterComponent } from './components/list-shop-footer/list-shop-footer.component';
import { ListShopHeaderComponent } from './components/list-shop-header/list-shop-header.component';
import { ListShopListComponent } from './components/list-shop-list/list-shop-list.component';
import { ListShopDataManagerService } from './services/list-shop-data-manager.service';
import { ListShopDialogsService } from './services/list-shop-dialogs.service';
import { ListShopStateService } from './services/list-shop-state.service';
import { ListShopService } from './services/list-shop.service';

const imports = [
  IonContent,

  DatePipe,

  ListShopHeaderComponent,
  ListShopFooterComponent,
  ListShopFabActionsComponent,
  ListShopEmptyComponent,
  ListShopListComponent,
  SharedFabComponent,
];

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.page.html',
  styleUrls: ['./list-shop.page.scss'],
  standalone: true,
  imports,
  providers: [
    ListShopService,
    ListShopDataManagerService,
    ListShopDialogsService,
    ListShopStateService,
  ],
})
export class ListShopPage {
  private listShopService = inject(ListShopService);
  private state = inject(ListShopStateService);
  shopDate = computed(() => this.state.listOnEdit()?.shopDate);
  mode = this.state.mode.asReadonly();

  protected emptyList = computed(() => this.state.listItemShop().length === 0);

  ionViewDidEnter() {
    if (this.state.mode() === 'new') {
      this.listShopService.initNewMode();
    } else if (this.state.mode() === 'draft') {
      this.listShopService.initDraftMode();
    } else {
      this.listShopService.initViewMode();
    }
  }

  protected openItemForm() {
    this.listShopService.openItemForm();
  }

  protected returnArchive() {
    this.listShopService.returnHistory();
  }
}
