import { AppRoutes } from 'src/app/AppRoutes';
import { IconSrc } from 'src/app/shared';

export interface MenuItem {
  iconSrc: IconSrc;
  title: string;
  url: AppRoutes;
  id: string;
}
