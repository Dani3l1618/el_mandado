import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';

import { IconComponent } from 'src/app/shared';
import { HomeCard } from '../../models';
import { HomeExpensivePipe, HomeLocationPipe } from '../../pipes';

const imports = [
  CurrencyPipe,
  IonText,
  NgClass,

  IconComponent,
  HomeExpensivePipe,
  HomeLocationPipe,
];

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  standalone: true,
  imports,
  providers: [CurrencyPipe, DatePipe],
})
export class HomeCardComponent {
  info = input.required<HomeCard>();
  cssClass = input<string>();

  // getData<T>(data: string|string[]): T{
  //   return data as T
  // }
}
