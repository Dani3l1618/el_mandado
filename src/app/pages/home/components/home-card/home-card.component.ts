import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {
  Component,
  input,
  linkedSignal,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
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
export class HomeCardComponent implements OnChanges, OnDestroy {
  info = input.required<HomeCard>();
  cssClass = input<string>();
  data = linkedSignal(() => this.info().data());
  private interval?: ReturnType<typeof setInterval>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['info'].firstChange) {
      if (this.info().updateData) this.updateData();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private updateData() {
    this.interval = setInterval(() => {
      const newData = this.info().data();
      this.data.set(newData);
    }, 4000);
  }
}
