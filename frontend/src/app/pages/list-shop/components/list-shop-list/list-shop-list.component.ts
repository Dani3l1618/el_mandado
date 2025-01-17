import { Component, inject, viewChild } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { ListShopStateService } from '../../services/list-shop-state.service';
import { ListShopItemComponent } from '../list-shop-item/list-shop-item.component';

const imports = [IonList, ListShopItemComponent];

@Component({
  selector: 'app-list-shop-list',
  templateUrl: './list-shop-list.component.html',
  styleUrls: ['./list-shop-list.component.scss'],
  standalone: true,
  imports,
})
export class ListShopListComponent {
  private state = inject(ListShopStateService);
  private ionShopList = viewChild(IonList);

  listShop = this.state.listItemShop.asReadonly();

  public async closeSlidingItems(): Promise<boolean | undefined> {
    return await this.ionShopList()?.closeSlidingItems();
  }
}
