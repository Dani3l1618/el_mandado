import { HomeCardInfo, HomeRows } from '../models';

export const HOME_CARD_NULL_INFO: HomeCardInfo = {
  expensive: null,
  lastShop: null,
  location: null,
  totalItems: null,
};

export const HOME_CARDS: (info: HomeCardInfo) => HomeRows[] = (info) => [
  {
    id: 1,
    data: [
      {
        id: 'expensive',
        data: info.lastShop,
        title: 'Gasto última compra',
        icon: 'cash',
        pipe: {
          dataType: 'currency',
          format: '1.2-2',
        },
      },
      {
        id: 'products',
        data: info.totalItems,
        title: 'Productos comprados',
        icon: 'cart',
        pipe: {
          dataType: 'str',
          format: '',
        },
      },
    ],
  },

  {
    id: 2,
    data: [
      {
        id: 'expensive',
        data: info.expensive,
        title: 'Productos más caro',
        icon: 'bag',
        pipe: {
          dataType: 'home-expensive',
          format: '1.2-2',
        },
        cssClass: 'card--sm',
      },
      {
        id: 'location',
        data: info.location,
        title: 'Ubicación',
        icon: 'pin',
        pipe: {
          dataType: 'home-location',
          format: 'dd/LLL',
        },
        cssClass: 'card--sm',
      },
    ],
  },
];
