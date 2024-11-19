import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { interval } from 'rxjs';
import { TimerPipe } from 'src/app/shared';

const imports = [IonChip, IonIcon, IonLabel, AsyncPipe, TimerPipe];

@Component({
  selector: 'app-list-shop-timer',
  templateUrl: './list-shop-timer.component.html',
  styleUrls: ['./list-shop-timer.component.scss'],
  standalone: true,
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListShopTimerComponent {
  timeInStore = interval(1000);

  constructor() {
    console.log(
      '%ctodo: Empezar el timer cuando se agregae un primer elemento',
      'color: #1a4704; background-color: #d0f0c0;',
    );
  }
}
