import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonItemSliding } from '@ionic/angular/standalone';
import { IconComponent, SharedListOptionsComponent } from 'src/app/shared';
import { ListShopItem } from '../../models/list-shop.model';
import { ListShopStateService } from '../../services/list-shop-state.service';
import { ListShopService } from '../../services/list-shop.service';

const imports = [
  IonItem,
  IonItemSliding,

  CurrencyPipe,
  ReactiveFormsModule,

  IconComponent,
  SharedListOptionsComponent,
];

@Component({
  selector: 'app-list-shop-item',
  templateUrl: './list-shop-item.component.html',
  styleUrls: ['./list-shop-item.component.scss'],
  standalone: true,
  imports,
})
export class ListShopItemComponent {
  private listShopService = inject(ListShopService);
  private sliding = viewChild(IonItemSliding);
  private state = inject(ListShopStateService);
  item = input.required<ListShopItem>();

  showIncrements = computed(() => ['new', 'draft'].includes(this.state.mode()));
  //todo: pasar la tupla a un objeto.

  modifyQuantity(quantity: 1 | -1) {
    const newQuantity = this.item().quantity + quantity;

    this.listShopService.editListShopItem(this.item().id, {
      quantity: newQuantity >= 0 ? newQuantity : 0,
    });
  }

  deleteItem() {
    this.listShopService.deleteItem(this.item().id);
  }

  async editItem() {
    await this.listShopService.openItemForm(this.item());
    this.sliding()?.closeOpened();
  }
}
