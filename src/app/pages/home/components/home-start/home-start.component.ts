import { Component } from '@angular/core';
import {IonButton} from "@ionic/angular/standalone"
const imports = [
  IonButton
];

@Component({
  selector: 'app-home-start',
  templateUrl: './home-start.component.html',
  styleUrls: ['./home-start.component.scss'],
  standalone: true,
  imports
})
export class HomeStartComponent  {

  constructor() { }

}
