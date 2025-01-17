import { inject, Injectable, Signal, signal } from '@angular/core';
import {
  ConfirmDialog,
  ModalService,
  SharedConfirmDialogComponent,
} from 'src/app/shared';
import { Store } from '../../tiendas/models';
import { ListShopConfigComponent } from '../components/list-shop-config/list-shop-config.component';
import { ListShopFormComponent } from '../components/list-shop-form/list-shop-form.component';
import { ListShopSelectDraftComponent } from '../components/list-shop-select-draft/list-shop-select-draft.component';
import {
  LS_DF_WARN_ARCHIVE,
  LS_DF_WARN_DELETE,
  LS_DF_WARN_EXIT,
  LS_DF_WARN_FINISH,
  LS_NW_WARN_EXIT,
  LS_NW_WARN_FINISH,
} from '../constants/list-shop.config';
import {
  ListShop,
  ListShopConfig,
  ListShopItem,
  ListShopMode,
} from '../models/list-shop.model';
import { ListShopStateService } from './list-shop-state.service';
import { ListShopService } from './list-shop.service';

@Injectable()
export class ListShopDialogsService {
  private modalService = inject(ModalService);

  async openListConfig(
    stores: Signal<Store[]>,
    currentConfig: Signal<ListShopConfig | undefined> = signal(undefined),
  ): Promise<ListShopConfig | undefined> {
    const response = await this.modalService.openModal<ListShopConfig>({
      component: ListShopConfigComponent,
      componentProps: {
        stores,
        currentConfig,
      },
      cssClass: ['modal-35'],
    });

    return response;
  }

  async openDraftConfig(
    state: ListShopStateService,
  ): Promise<ListShop | undefined> {
    const response = await this.modalService.openModal<ListShop>({
      component: ListShopSelectDraftComponent,
      componentProps: {
        state,
      },
      cssClass: ['modal-25'],
    });

    return response;
  }

  async hanldeExit(mode: ListShopMode): Promise<boolean> {
    const props = mode === 'new' ? LS_NW_WARN_EXIT : LS_DF_WARN_EXIT;

    return await this.openConfirmDialog(props);
  }

  async openFinishShopConfirmation(mode: ListShopMode) {
    const props = mode === 'new' ? LS_NW_WARN_FINISH : LS_DF_WARN_FINISH;

    return this.openConfirmDialog(props);
  }

  async openArchiveShopConfirmation() {
    const props = LS_DF_WARN_ARCHIVE;

    return this.openConfirmDialog(props);
  }

  async openDeleteDraftConfirmation() {
    const props = LS_DF_WARN_DELETE;

    return this.openConfirmDialog(props);
  }

  async openItemForm(listShopService: ListShopService, item?: ListShopItem) {
    const newItem = await this.modalService.openModal({
      component: ListShopFormComponent,
      componentProps: {
        listShopService,
        itemOnEdit: signal(item),
      },
    });

    return newItem;
  }

  private async openConfirmDialog(
    componentProps: ConfirmDialog,
  ): Promise<boolean> {
    const confirm = await this.modalService.openModal({
      component: SharedConfirmDialogComponent,
      componentProps,
      cssClass: 'modal-sm',
    });
    return Boolean(confirm);
  }
}
