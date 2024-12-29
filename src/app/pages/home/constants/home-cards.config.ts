import { HomeCardInfo, HomeListItem, HomeRows } from '../models';

export const HOME_CARD_NULL_INFO: HomeCardInfo = {
  expensive: () => null,
  totalShop: () => null,
  location: () => null,
  totalItems: () => null,
};

export const HOME_CARDS: (info: HomeCardInfo) => HomeRows[] = (info) => [
  {
    id: 1,
    data: [
      {
        id: 'expensive',
        data: info.totalShop,
        updateData: false,
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
        title: 'Total prod. comprados',
        updateData: false,
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
        updateData: true,
        title: 'Prod. comprados',
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
        updateData: false,
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

export const HOME_LIST: (data: [number, number, number]) => HomeListItem[] = ([
  total,
  budget,
  time,
]) => [
  {
    title: 'Total gastado',
    label: '6 meses',
    data: total.toString(),
    icon: 'list',
    id: 1,
    pipe: 'currency',
  },
  {
    title: 'Gasto mensual',
    label: 'promedio',
    data: budget.toString(),
    icon: 'wallet',
    id: 2,
    pipe: 'currency',
  },
  {
    title: 'Tiempo',
    label: 'promedio',
    data: time.toString(),
    icon: 'time',
    id: 3,
    pipe: 'time',
  },
];
