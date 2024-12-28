import { Component, inject } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { HomeCardComponent } from '..';
import { HomeService } from '../../services';

const imports = [IonGrid, IonRow, IonCol, HomeCardComponent];

@Component({
  selector: 'app-last-shoping',
  templateUrl: './last-shoping.component.html',
  styleUrls: ['./last-shoping.component.scss'],
  standalone: true,
  imports,
})
export class LastShopingComponent {
  private homeService = inject(HomeService);

  rows = this.homeService.homeInfoCards.asReadonly();
}
