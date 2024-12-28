import { CurrencyPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';

import { IconComponent, TimerPipe } from 'src/app/shared';
import { HomeListItem } from '../../models';
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
  homeService = inject(HomeService);

  info: Signal<HomeListItem[]>;

  constructor() {
    this.info = this.homeService.getListItems();
  }
}
