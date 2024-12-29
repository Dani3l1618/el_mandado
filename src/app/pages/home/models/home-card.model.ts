import { IconName } from 'src/app/shared/models/icon.model';
import { PipeDefinition } from 'src/app/shared/models/pipe.model';

export interface HomeCard {
  data: () => string[] | null;
  updateData: boolean;
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

export type HomeCardInfoFunc<T> = () => T | null;

export interface HomeCardInfo {
  totalShop: HomeCardInfoFunc<[string]>;
  totalItems: HomeCardInfoFunc<[string]>;
  expensive: HomeCardInfoFunc<[string, string] | null>;
  location: HomeCardInfoFunc<[string, string]>;
}
