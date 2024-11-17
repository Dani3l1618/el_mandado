import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MediaService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private mediaService = inject(MediaService);
  constructor() {
    this.mediaService.registIcons();
  }
  //https://app.uizard.io/prototypes/create?prototypeTemplateId=XXwl8eP0eouzp0qwOjMM
  colors = [
    '#fee6ab', //primary
    '#f6f6f0', //background
    '#241808', //terciary
    '#ffffff', //secondary
    '#f3d58b',
  ];
}
