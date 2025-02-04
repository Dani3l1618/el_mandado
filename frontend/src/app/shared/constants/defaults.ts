import { ShowOptions } from '@capacitor/splash-screen';
import { Store } from 'src/app/pages/tiendas/models';
import { StoreChain, StoreMedia } from '../models/store.model';

export const DEFAULT_STORE: Store = {
  id: '0',
  chain: StoreChain.none,
  street: 'NA',
  colonia: 'NA',
  postalCode: 'NA',
  city: 'NA',
  state: 'NA',
  img: StoreMedia.none,
  lastUpdate: new Date(),
};

export const SPLASH_SCREEN_SHOW: ShowOptions = {
  autoHide: true,
  showDuration: 1000,
  fadeOutDuration: 200,
};

export const HELLO_MESSAGE = 'Hi! You are cool 😎';
