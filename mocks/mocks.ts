import { StoreChain, StoreMedia } from 'src/app/shared';

export const LISTSHOP_ITEMS = [
  {
    barcode: '7501031311309',
    name: 'Leche Entera Deslactosada 1lt',
    quantity: 4,
    price: 150,
    id: 'item1',
  },
  {
    barcode: '7501001504013',
    name: 'Arroz Blanco',
    quantity: 4,
    price: 100.0,
    id: 'item2',
  },
  {
    barcode: '7501013101035',
    name: 'Frijoles Negros',
    quantity: 3,
    price: 15.0,
    id: 'item3',
  },
  {
    barcode: '7501023530012',
    name: 'Aceite Vegetal',
    quantity: 1,
    price: 35.0,
    id: 'item4',
  },
  {
    name: 'Pan Integral',
    quantity: 1,
    price: 28.0,
    id: 'item5',
  },
  {
    barcode: '7501002501233',
    name: 'Jugo de Naranja',
    quantity: 2,
    price: 12.0,
    id: 'item6',
  },
  {
    barcode: '7503001234567',
    name: 'Huevo',
    quantity: 1,
    price: 32.0,
    id: 'item7',
  },
  {
    name: 'Azúcar Morena',
    quantity: 1,
    price: 22.5,
    id: 'item8',
  },
  {
    barcode: '7502005556789',
    name: 'Café Molido',
    quantity: 1,
    price: 96.0,
    id: 'item9',
  },
  {
    name: 'Galletas de Avena',
    quantity: 2,
    price: 15.0,
    id: 'item10',
  },
];

export const SHOP = {
  store: {
    chain: StoreChain.bodegaAurrera,
    street: 'Av. Texcoco',
    city: 'La Paz',
    colonia: 'Nezahualcoyotl',
    state: 'MEX',
    postalCode: '56514',
    id: '1f74f9f5-4b86-40b9-8560-81df5fb9460a',
    img: StoreMedia.bodegaAurrera,
    lastUpdate: new Date('2024-11-15T23:30:17.440Z'),
  },
  budget: 4200,
};
