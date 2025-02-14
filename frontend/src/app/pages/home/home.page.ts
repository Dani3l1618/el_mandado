import { Component, inject, OnInit } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular/standalone';
import { TitleComponent } from 'src/app/shared';
import {
  HomeListComponent,
  HomeStartComponent,
  LastShopingComponent,
} from './components';
import { HomeService } from './services';

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
export class HomePage implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly platform = inject(Platform);

  ngOnInit(): void {
    this.homeService.getResume();
    this.homeService.getListItems();
    this.listenExit();
  }

  ionViewWillEnter() {
    this.homeService.getResume();
    this.homeService.getListItems();
  }

  listenExit() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      this.homeService.openConfirmExit();
    });
  }
}
