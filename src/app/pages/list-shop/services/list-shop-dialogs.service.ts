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
  ListShop,
  ListShopConfig,
  ListShopItem,
} from '../models/list-shop.model';
import { ListShopStateService } from './list-shop-state.service';
import { ListShopService } from './list-shop.service';

@Injectable()
export class ListShopDialogsService {
  private modalService = inject(ModalService);

  async openListConfig(
    stores: Signal<Store[]>,
  ): Promise<ListShopConfig | undefined> {
    const response = await this.modalService.openModal<ListShopConfig>({
      component: ListShopConfigComponent,
      componentProps: {
        stores,
      },
    });

    return response;
  }

  async openDraftConfig(
    listShopService: ListShopService,
    state: ListShopStateService,
  ): Promise<ListShop | undefined> {
    const response = await this.modalService.openModal<ListShop>({
      component: ListShopSelectDraftComponent,
      componentProps: {
        listShopService,
        state,
      },
      cssClass: ['modal-25'],
    });

    return response;
  }

  async hanldeExit(): Promise<boolean> {
    const props = {
      title: 'Cancelar compra',
      question: '¿Cancelar compra y eliminar la lista?',
      confirmText: 'Aceptar',
    };

    return await this.openConfirmDialog(props);
  }

  async openFinishShopConfirmation() {
    const props = {
      title: 'Terminar compras',
      question: '¿Finalizar día de shopping?',
      confirmText: 'Aceptar',
    };

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
