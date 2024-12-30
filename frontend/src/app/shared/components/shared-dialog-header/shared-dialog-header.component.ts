import { Component, inject, input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

const imports = [
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonIcon,
];

@Component({
  selector: 'app-shared-dialog-header',
  templateUrl: './shared-dialog-header.component.html',
  styleUrls: ['./shared-dialog-header.component.scss'],
  standalone: true,
  imports,
})
export class SharedDialogHeaderComponent {
  title = input<string>('El mandado');
  private modalController = inject(ModalController);

  cancel() {
    this.modalController.dismiss(undefined, 'cancel');
  }
}
