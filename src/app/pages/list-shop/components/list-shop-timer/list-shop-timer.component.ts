import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { interval, tap } from 'rxjs';
import { TimerPipe } from 'src/app/shared';
import { ListShopService } from '../../services/list-shop.service';

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
  private listShopService = inject(ListShopService);
  protected timeInStore$ = interval(1000).pipe(tap(() => this._timeInStore++));
  private _timeInStore = 0;
  protected emptyList = computed(
    () => this.listShopService.listItemShop().length === 0,
  );

  get timeInStore() {
    return this._timeInStore;
  }
}
