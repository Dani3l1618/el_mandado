import { Component } from '@angular/core';
import {
  IonContent, IonText
} from '@ionic/angular/standalone';
import { HomeListComponent, LastShopingComponent } from './components';



const imports = [
  IonContent,
  IonText,

  LastShopingComponent,
  HomeListComponent,
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports,
})
export class HomePage {}
