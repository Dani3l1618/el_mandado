import { Component, inject, Signal } from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HomePage } from '../../home.page';
import { HomeRows } from '../../models/home-card.model';
import { HomeService } from '../../services/home.service';
import { HomeCardComponent } from '../home-card/home-card.component';

@Component({
  selector: 'app-last-shoping',
  templateUrl: './last-shoping.component.html',
  styleUrls: ['./last-shoping.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    IonIcon,
    IconComponent,
    HomeCardComponent,
    HomePage,
  ],
})
export class LastShopingComponent {
  private homeService = inject(HomeService);

  rows: Signal<HomeRows[]>;
  constructor() {
    this.rows = this.homeService.getResume();
  }
}
