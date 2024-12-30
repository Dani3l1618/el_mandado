import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { ICONS } from '../constants/icons';
import { StoreMedia } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly STORE_MEDIA_PATH = 'assets/img/stores/';

  registIcons() {
    addIcons({ ...ICONS });
  }

  createFullMediaStorePath(img: StoreMedia) {
    return `${this.STORE_MEDIA_PATH}store_${img}`;
  }
}
