import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  IonAvatar,
  IonHeader,
  IonImg,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AdressPipe, MediaStorePipe } from 'src/app/shared';
import { ListShopStateService } from '../../services/list-shop-state.service';
import { ListShopTimerComponent } from '../list-shop-timer/list-shop-timer.component';

const imports = [
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonImg,
  IonText,
  IonSkeletonText,

  NgClass,

  MediaStorePipe,
  AdressPipe,
  ListShopTimerComponent,
];

@Component({
  selector: 'app-list-shop-header',
  templateUrl: './list-shop-header.component.html',
  styleUrls: ['./list-shop-header.component.scss'],
  standalone: true,
  imports,
})
export class ListShopHeaderComponent {
  private state = inject(ListShopStateService);
  public config = this.state.storeConfig.asReadonly();
  private mode = this.state.mode.asReadonly();
  isLoading = computed(() => this.config() === undefined);
  title = computed(() =>
    this.mode() === 'new' ? 'De compras' : 'Revisando ticket',
  );
}
