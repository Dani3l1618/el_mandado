import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { interval, tap } from 'rxjs';
import { ANIMATION_SOURCE, TimerPipe } from 'src/app/shared';
import { ListShopStateService } from '../../services/list-shop-state.service';

const imports = [IonChip, IonLabel, AsyncPipe, TimerPipe, LottieComponent];

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
  clock?: AnimationItem;
  lottieOptions = signal<AnimationOptions>({
    path: ANIMATION_SOURCE.clock,
    loop: true,
    autoplay: false,
  });

  protected timeInStore$ = interval(1000).pipe(
    tap(() => this.timeInStore.update((t) => t + 1)),
  );

  protected emptyList = computed(() => this.state.listItemShop().length === 0);

  constructor() {
    effect(() => {
      if (!this.emptyList()) {
        this.clock?.play();
      } else {
        this.clock?.stop();
      }
    });
  }

  handleAnimationCreation(animation: AnimationItem) {
    this.clock = animation;
  }
}
