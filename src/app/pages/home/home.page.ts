import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { TitleComponent } from 'src/app/shared';
import { HomeListComponent, HomeStartComponent, LastShopingComponent } from './components';



const imports = [
  IonContent,

  LastShopingComponent,
  HomeListComponent,
  HomeStartComponent,
  TitleComponent,
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports,
})
export class HomePage {}
