import { SelectModel } from '../models/form.model';
import { StoreChain } from '../models/store.model';

export const STATE_CATALOG: SelectModel<string>[] = [
  { value: 'CDMX', text: 'Ciudad de México' },
  { value: 'MEX', text: 'Estado de México' },
];

export const STORE_CHAIN_CATALOG: StoreChain[] = [
  StoreChain.bodegaAurrera,
  StoreChain.chedraui,
  StoreChain.laComer,
  StoreChain.oxxo,
  StoreChain.scorpion,
  StoreChain.sevenEleven,
  StoreChain.soriana,
  StoreChain.walmart,
  StoreChain.none,
];
