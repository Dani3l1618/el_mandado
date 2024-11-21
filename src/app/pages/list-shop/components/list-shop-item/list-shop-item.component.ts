import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonItem } from '@ionic/angular/standalone';
import { debounceTime } from 'rxjs';
import { IconComponent } from 'src/app/shared';
import { ListShopItem } from '../../models/list-shop.model';
import { ListShopService } from '../../services/list-shop.service';

const imports = [
  IonInput,
  CurrencyPipe,
  IonItem,
  IconComponent,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-list-shop-item',
  templateUrl: './list-shop-item.component.html',
  styleUrls: ['./list-shop-item.component.scss'],
  standalone: true,
  imports,
})
export class ListShopItemComponent implements OnChanges {
  private listShopService = inject(ListShopService);
  item = input.required<ListShopItem>();
  //todo: pasar la tupla a un objeto.

  itemName = new FormControl('');
  itemName$ = this.itemName.valueChanges.pipe(
    debounceTime(500),
    takeUntilDestroyed(),
  );

  constructor() {
    this.itemName$.subscribe((name) => {
      this.onNameChange(name ?? '');
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const itemChange = simpleChanges['item'];
    if (itemChange.firstChange) {
      this.itemName.setValue(itemChange.currentValue.name);
    }
  }

  modifyQuantity(quantity: 1 | -1) {
    const newQuantity = this.item().quantity + quantity;

    this.listShopService.editListShopItem(this.item().id, {
      quantity: newQuantity >= 0 ? newQuantity : 0,
    });
  }

  onNameChange(name: string) {
    this.listShopService.editListShopItem(this.item().id, {
      name,
    });
  }
}
