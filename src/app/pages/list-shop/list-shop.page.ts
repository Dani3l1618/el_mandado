import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

const imports = [
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  CommonModule,
  FormsModule,
];

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.page.html',
  styleUrls: ['./list-shop.page.scss'],
  standalone: true,
  imports,
})
export class ListShopPage {}
