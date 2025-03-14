import { DatePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { IonContent, Platform } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {
  APP_COLORS,
  DataService,
  DeviceService,
  SharedFabComponent,
} from 'src/app/shared';
import { ListShopEmptyComponent } from './components/list-shop-empty/list-shop-empty.component';
import { ListShopFabActionsComponent } from './components/list-shop-fab-actions/list-shop-fab-actions.component';
import { ListShopFooterComponent } from './components/list-shop-footer/list-shop-footer.component';
import { ListShopHeaderComponent } from './components/list-shop-header/list-shop-header.component';
import { ListShopListComponent } from './components/list-shop-list/list-shop-list.component';
import { INITIAL_CURRENT_DRAFT } from './constants/list-shop.config';
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
  private deviceService = inject(DeviceService);
  private readonly dataManager = inject(ListShopDataManagerService);
  private readonly dataService = inject(DataService);
  private platform = inject(Platform);
  private backBtnSubs?: Subscription;
  private itemShopList = viewChild(ListShopListComponent);
  private readonly listshopFab = viewChild(ListShopFabActionsComponent);
  shopDate = computed(() => this.state.listOnEdit()?.shopDate);
  mode = this.state.mode.asReadonly();

  protected emptyList = computed(() => this.state.listItemShop().length === 0);

  constructor() {
    effect(
      () => {
        const mode = this.state.mode();
        const listShop = this.state.listItemShop();
        untracked(() => {
          this.dataService.saveData('currentMode', mode);
          this.listShopService.saveDraft();
        });
      },
      { forceRoot: true },
    );

    console.log(
      '%ctodo: Disminuir el precio de 10 pesos',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    console.log(
      '%ctodo: Poner colores a los botones de acción de las listas, confunden',
      'color: #1a4704; background-color: #d0f0c0;',
    );
  }

  async ionViewWillEnter() {
    this.deviceService.changeStatusBarColor(APP_COLORS.primary);
    const currentDraft = await this.dataManager.getCurrentDraftList();

    this.state.currentDraft.set(
      currentDraft ? currentDraft : INITIAL_CURRENT_DRAFT,
    );
  }

  ionViewDidEnter() {
    if (this.state.mode() === 'new') {
      this.listShopService.initNewMode();
    } else if (this.state.mode() === 'draft') {
      this.listShopService.initDraftMode();
    } else {
      this.listShopService.initViewMode();
    }

    this.backBtnSubs = this.platform.backButton.subscribeWithPriority(
      800,
      (next) => {
        if (this.state.mode() !== 'view') {
          this.listShopService.hanldeExit();
          return;
        }

        next();
      },
    );
  }

  protected openItemForm() {
    this.listshopFab()?.closeFabButton();
    this.listShopService.openItemForm();
  }

  protected returnArchive() {
    this.listShopService.returnHistory();
  }

  protected closeSlidingItems() {
    this.itemShopList()?.closeSlidingItems();
  }

  ionViewWillLeave() {
    this.deviceService.changeStatusBarColor();
  }

  ionViewDidLeave() {
    this.backBtnSubs?.unsubscribe();
  }
}
