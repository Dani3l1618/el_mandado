import { StoreChain, StoreMedia } from 'src/app/shared';

export interface Store {
  id: string;
  chain: StoreChain;
  street: string;
  colonia: string;
  postalCode: string;
  city: string;
  state: string;
  img: StoreMedia;
  lastUpdate: Date;
}

export type StoreForm = Omit<Store, 'id' | 'img' | 'chain' | 'lastUpdate'> & {
  chain: keyof typeof StoreChain;
};
