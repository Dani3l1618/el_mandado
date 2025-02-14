import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  Platform,
} from '@ionic/angular/standalone';
import { TitleComponent } from 'src/app/shared';
import {
  HomeListComponent,
  HomeStartComponent,
  LastShopingComponent,
} from './components';
import { HomeService } from './services';

const imports = [
  IonContent,
  IonRefresher,
  IonRefresherContent,

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
export class HomePage implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly platform = inject(Platform);

  ngOnInit(): void {
    this.refreshData();
    this.listenExit();
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  listenExit() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      this.homeService.openConfirmExit();
    });
  }

  async handleRefresh(event: CustomEvent) {
    await this.refreshData();
    (event.target as HTMLIonRefresherElement).complete();
  }

  private async refreshData() {
    await this.homeService.getResume();
    await this.homeService.getListItems();
  }
}
