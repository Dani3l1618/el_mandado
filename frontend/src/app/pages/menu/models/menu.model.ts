import { AppRoutes } from "src/app/app.routes";
import { IconSrc } from "src/app/shared";

export interface MenuItem{
  iconSrc:IconSrc;
  title: string,
  url: AppRoutes,
  id: string
}
