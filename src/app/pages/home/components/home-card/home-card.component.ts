import { Component, input } from '@angular/core';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { IonText } from '@ionic/angular/standalone';
import { HomeCard } from '../../models/home-card.model';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { HomeExpensivePipe } from '../../pipes/home-expensive.pipe';
import { HomeLocationPipe } from '../../pipes/home-location.pipe';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  standalone: true,
  imports: [
    IconComponent,
    IonText,
    CurrencyPipe,
    NgClass,
    HomeExpensivePipe,
    HomeLocationPipe
  ],
  providers:[
    CurrencyPipe,
    DatePipe
  ]
})
export class HomeCardComponent {
  info = input.required<HomeCard>();
  cssClass = input<string>();

  isArray(data: string | string[]) {
    return Array.isArray(data);
  }

  getData<T>(data: string|string[]): T{
    return data as T
  }
}
