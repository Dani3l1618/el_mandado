import { AppRoutes } from 'src/app/app.routes';
import { IconSrc } from 'src/app/shared';

export const MENU_ITEMS = [
  {
    iconSrc: IconSrc.addList,
    title: 'Nueva Lista',
    url: AppRoutes.home,
    id: '1',
  },
  {
    iconSrc: IconSrc.editList,
    title: 'Borrador',
    url: AppRoutes.home,
    id: '2',
  },
  {
    iconSrc: IconSrc.history,
    title: 'Historial',
    url: AppRoutes.home,
    id: '3',
  },
  {
    iconSrc: IconSrc.location,
    title: 'Mis tienditas',
    url: AppRoutes.stores,
    id: '4',
  },
  {
    iconSrc: IconSrc.search,
    title: 'Buscador',
    url: AppRoutes.home,
    id: '5',
  },
  {
    iconSrc: IconSrc.sync,
    title: 'Sincronizar',
    url: AppRoutes.home,
    id: '6',
  },
];