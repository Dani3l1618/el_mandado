import { Component, inject } from '@angular/core';

import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { MediaService, StatusBarService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private mediaService = inject(MediaService);
  private statusbarService = inject(StatusBarService);
  private platform = inject(Platform);
  constructor() {
    this.mediaService.registIcons();
    this.configApp();
    console.log(
      '%ctodo:Back button para cerrar app',
      'color: #1a4704; background-color: #d0f0c0;',
    );
  }

  async configApp() {
    await this.platform.ready();
    this.statusbarService.changeColor();
  }
}
