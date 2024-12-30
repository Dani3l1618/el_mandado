import { Component, computed, inject } from '@angular/core';
import {
  IonHeader,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AdressPipe } from 'src/app/shared';
import { SharedStoreImgComponent } from 'src/app/shared/components/shared-store-img/shared-store-img.component';
import { ListShopStateService } from '../../services/list-shop-state.service';
import { ListShopTimerComponent } from '../list-shop-timer/list-shop-timer.component';

const imports = [
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonSkeletonText,

  AdressPipe,
  ListShopTimerComponent,
  SharedStoreImgComponent,
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
