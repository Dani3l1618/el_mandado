import { inject, Injectable, signal } from '@angular/core';
import {
  DataService,
  ModalService,
  StoreChain,
  StoreMedia,
} from 'src/app/shared';
import { TIENDA_DIALOG_DELETE } from '../constants/tienda.const';
import { Store, StoreForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private dataService = inject(DataService);
  private modalService = inject(ModalService);

  storeInEdit = signal<Store | null>(null);

  async saveStore(newStore: StoreForm) {
    const store = this.generateStoreItem(newStore);
    const stores = (await this.dataService.getData<Store[]>('stores')) ?? [];

    await this.dataService.saveData('stores', [...stores, store]);
  }

  async getStores(): Promise<Store[]> {
    return (await this.dataService.getData<Store[]>('stores')) ?? [];
  }

  async deleteStore(id: string) {
    const stores = await this.getStores();
    const newStores = stores.filter((store) => store.id !== id);

    await this.dataService.saveData('stores', newStores);
  }

  async editStore(storeId: string, store: StoreForm) {
    console.log(
      '%ctodo: enviar mensaje cuando los ids no coincidan',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    if (storeId !== this.storeInEdit()?.id) return;

    const stores = await this.getStores();
    const newStoreData = this.generateStoreItem(store, storeId);

    const newStore = {
      ...this.storeInEdit(),
      ...newStoreData,
      lastUpdate: new Date(),
    };

    const newStores = stores.map((store) =>
      store.id === storeId ? newStore : store,
    );

    await this.dataService.saveData('stores', newStores);
  }

  getStoreCatalog() {
    return this.dataService.getStoreCatalog();
  }

  getStateCatalog() {
    return this.dataService.getStateCatalog();
  }

  getStoreChainKey(chain: StoreChain): keyof typeof StoreChain {
    return Object.keys(StoreChain).find(
      (key) => StoreChain[key as keyof typeof StoreChain] === chain,
    )! as keyof typeof StoreChain;
  }

  async openDeleteDialog(store: Store): Promise<boolean> {
    const wantDelete = await this.modalService.openModal(
      TIENDA_DIALOG_DELETE(store),
    );

    return Boolean(wantDelete);
  }

  private generateStoreItem(newStore: StoreForm, currentId?: string): Store {
    const id = currentId ?? this.dataService.generateId();
    return {
      ...newStore,
      id,
      img: StoreMedia[newStore.chain],
      chain: StoreChain[newStore.chain],
      lastUpdate: new Date(),
    };
  }
}
