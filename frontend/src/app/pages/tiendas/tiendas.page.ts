import {
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { IonContent, IonList } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/AppRoutes';
import { ModalService, SharedFabComponent } from 'src/app/shared';
import { SharedHeaderPageComponent } from 'src/app/shared/components/shared-header-page/shared-header-page.component';
import { TiendasFormComponent, TiendasItemComponent } from './components';
import { Store } from './models';
import { TiendaService } from './service/tienda.service';

const imports = [
  IonContent,
  IonList,

  TiendasItemComponent,
  SharedFabComponent,
  SharedHeaderPageComponent,
];

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
  standalone: true,
  imports,
})
export class TiendasPage implements OnInit {
  defaultHref = AppRoutes.home;
  private modalService = inject(ModalService);
  private tiendaService = inject(TiendaService);
  private list = viewChild(IonList);

  stores: WritableSignal<Store[]> = signal([]);

  ngOnInit(): void {
    this.getStores();
    console.log(
      '%ctodo: agregar la cantidad de visitas a la tienda',
      'color: #1a4704; background-color: #d0f0c0;',
    );
  }

  async createStore() {
    const response = await this.openForm();

    if (response) {
      this.getStores();
    }
  }

  async getStores() {
    const stores = await this.tiendaService.getStores();
    this.stores.set(stores);
  }

  async deleteStore(store: Store) {
    const confirm = await this.tiendaService.openDeleteDialog(store);

    if (confirm) {
      await this.tiendaService.deleteStore(store.id);
      this.list()?.closeSlidingItems();
      this.getStores();
    }
  }

  async editStore(store: Store) {
    this.tiendaService.storeInEdit.set(store);

    const response = await this.openForm(false);

    if (response) {
      this.list()?.closeSlidingItems();
      this.getStores();
    }

    this.tiendaService.storeInEdit.set(null);
  }

  private async openForm(closeList = true): Promise<boolean> {
    if (closeList) this.list()?.closeSlidingItems();
    const response = await this.modalService.openModal({
      component: TiendasFormComponent,
      cssClass: 'modal-md',
    });

    return Boolean(response);
  }
}