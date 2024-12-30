import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { SharedDialogFooterComponent } from '../shared-dialog-footer/shared-dialog-footer.component';
import { SharedDialogHeaderComponent } from '../shared-dialog-header/shared-dialog-header.component';

const imports = [
  SharedDialogHeaderComponent,
  SharedDialogFooterComponent,
  IonContent,
  IonText,
];

@Component({
  selector: 'app-shared-confirm-dialog',
  templateUrl: './shared-confirm-dialog.component.html',
  styleUrls: ['./shared-confirm-dialog.component.scss'],
  standalone: true,
  imports,
})
export class SharedConfirmDialogComponent {
  private modalController = inject(ModalController);
  title: string = 'Titulo genérico';
  question: string = '¿Estás seguro de realizar esta acción?';
  detail?: string = '';
  confirmText: string = 'Confirmar';

  onConfirm() {
    this.modalController.dismiss(true);
  }
}
