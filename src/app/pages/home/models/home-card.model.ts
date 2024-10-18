import { IconName } from 'src/app/shared/models/icon.model';
import { PipeDefinition } from 'src/app/shared/models/pipe.model';

export interface HomeCard {
  data: string|string[];
  title: string;
  icon: IconName;
  pipe: PipeDefinition;
  id:string;
  cssClass?: string;
}

export type HomeRows = {
  id: number,
  data: [HomeCard, HomeCard]
}

