import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MediaService } from './shared';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  private mediaService = inject(MediaService);
  constructor() {
    this.mediaService.registIcons();
    console.log(
      '%ctodo: Bloquear back button cuando se este en el componente de list-items',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    console.log(
      '%ctodo: Crear el icon',
      'color: #1a4704; background-color: #d0f0c0;',
    );
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
