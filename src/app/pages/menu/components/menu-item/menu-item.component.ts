import { Component, inject, input, OnInit } from '@angular/core';
import { IconComponent } from 'src/app/shared';
import {IonText} from '@ionic/angular/standalone';
import { MenuItem } from '../../models';
import { MenuService } from '../../services';

const imports = [
  IonText,

  IconComponent
];

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  standalone:true,
  imports
})
export class MenuItemComponent  {
  private menuService = inject(MenuService);
  
  menuItem = input.required<MenuItem>();

  openItem(){
    this.menuService.goTo(this.menuItem().url);
  }
}
