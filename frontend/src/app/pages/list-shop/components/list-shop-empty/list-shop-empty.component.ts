import { Component } from '@angular/core';
import { IonImg, IonText } from '@ionic/angular/standalone';

const imports = [IonImg, IonText];
@Component({
  selector: 'app-list-shop-empty',
  templateUrl: './list-shop-empty.component.html',
  styleUrls: ['./list-shop-empty.component.scss'],
  standalone: true,
  imports,
})
export class ListShopEmptyComponent {}
