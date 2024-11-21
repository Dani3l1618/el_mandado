import { Component, computed, inject } from '@angular/core';
import { IonItem, IonList } from '@ionic/angular/standalone';
import { ListShopService } from '../../services/list-shop.service';
import { ListShopItemComponent } from '../list-shop-item/list-shop-item.component';

const imports = [IonList, IonItem, ListShopItemComponent];

@Component({
  selector: 'app-list-shop-list',
  templateUrl: './list-shop-list.component.html',
  styleUrls: ['./list-shop-list.component.scss'],
  standalone: true,
  imports,
})
export class ListShopListComponent {
  private listShopService = inject(ListShopService);

  listShop = computed(() => this.listShopService.listShop());
}
