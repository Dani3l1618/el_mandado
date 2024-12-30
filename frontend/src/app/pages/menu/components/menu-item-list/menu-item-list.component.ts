import { Component, input, OnInit } from '@angular/core';
import { IonGrid, IonCol, IonRow} from '@ionic/angular/standalone';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuItem } from '../../models';

const imports = [
  IonGrid,
  IonCol,
  IonRow,

  MenuItemComponent
];

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
  standalone: true,
  imports
})
export class MenuItemListComponent  {
menuItems = input.required<MenuItem[]>();

}
