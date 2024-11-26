import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import * as uuid from 'uuid';
import { STATE_CATALOG } from '../constants/state.catalog';
import { SelectModel } from '../models/form.model';
import { StorageKey } from '../models/storage.model';
import { StoreChain } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  async getData<T>(key: StorageKey): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  async saveData<T>(key: StorageKey, data: T): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(data),
    });
  }

  async removeData(key: StorageKey): Promise<void> {
    await Preferences.remove({ key });
  }

  getStoreCatalog(): SelectModel<keyof typeof StoreChain>[] {
    const catalog = Object.entries(StoreChain).map(([key, value]) => ({
      value: key as keyof typeof StoreChain,
      text: value,
    }));

    return catalog;
  }

  getStateCatalog(): SelectModel<string>[] {
    return STATE_CATALOG;
  }

  generateId(): string {
    return uuid.v4();
  }

  priceStringToNumber(price: string): number {
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  }
}
