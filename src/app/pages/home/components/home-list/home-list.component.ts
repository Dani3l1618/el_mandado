import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonList } from '@ionic/angular/standalone';

import { IconComponent, TimerPipe } from 'src/app/shared';
import { HomeListLabelPipe } from '../../pipes';
import { HomeService } from '../../services';

const imports = [
  IonList,
  IonItem,
  IonLabel,
  CurrencyPipe,

  IconComponent,
  HomeListLabelPipe,
  TimerPipe,
];

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
  standalone: true,
  imports,
})
export class HomeListComponent {
  private readonly homeService = inject(HomeService);

  info = this.homeService.homeInfoList.asReadonly();
}
