import { Component, input } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

const imports = [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle];

@Component({
  selector: 'app-shared-header-page',
  templateUrl: './shared-header-page.component.html',
  styleUrls: ['./shared-header-page.component.scss'],
  standalone: true,
  imports,
})
export class SharedHeaderPageComponent {
  defaultHref = input.required<string>();
  title = input.required<string>();
}
