import { IconName } from "src/app/shared/models/icon.model";

export interface HomeListItem {
  title: string;
  label: string;
  icon: IconName;
  data: string;
  id: number;
  pipe: 'currency' | 'time';
}