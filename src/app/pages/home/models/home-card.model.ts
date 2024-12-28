import { Nullable } from 'src/app/shared';
import { IconName } from 'src/app/shared/models/icon.model';
import { PipeDefinition } from 'src/app/shared/models/pipe.model';

export interface HomeCard {
  data: string[] | null;
  title: string;
  icon: IconName;
  pipe: PipeDefinition;
  id: string;
  cssClass?: string;
}

export type HomeRows = {
  id: number;
  data: [HomeCard, HomeCard];
};

export interface HomeCardInfo {
  lastShop: Nullable<[string]>;
  totalItems: Nullable<[string]>;
  expensive: Nullable<[string, string]>;
  location: Nullable<[string, string]>;
}
