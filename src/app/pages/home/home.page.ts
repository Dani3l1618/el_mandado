import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { LastShopingComponent } from './components/last-shoping/last-shoping.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, LastShopingComponent],
})
export class HomePage {
  constructor() {}
}
