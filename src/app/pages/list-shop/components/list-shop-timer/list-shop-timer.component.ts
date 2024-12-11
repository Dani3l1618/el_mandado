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
import { ListShopStateService } from '../../services/list-shop-state.service';

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
  private state = inject(ListShopStateService);
  mode = this.state.mode.asReadonly();
  timeInStore = this.state.timeInStore;

  protected timeInStore$ = interval(1000).pipe(
    tap(() => this.timeInStore.update((t) => t + 1)),
  );

  protected emptyList = computed(() => this.state.listItemShop().length === 0);
}
