import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon} from '@ionic/angular/standalone';

const imports = [
  IonButton,
  IonIcon
];

@Component({
  selector: 'app-menu-config',
  templateUrl: './menu-config.component.html',
  styleUrls: ['./menu-config.component.scss'],
  standalone: true,
  imports
})
export class MenuConfigComponent {


}
