import { Component, input, output } from '@angular/core';

import {
  IonButton,
  IonButtons,
  IonFooter,
  IonToolbar,
} from '@ionic/angular/standalone';

const imports = [IonToolbar, IonButtons, IonButton, IonFooter];

@Component({
  selector: 'app-shared-dialog-footer',
  templateUrl: './shared-dialog-footer.component.html',
  styleUrls: ['./shared-dialog-footer.component.scss'],
  standalone: true,
  imports,
})
export class SharedDialogFooterComponent {
  actionTxt = input<string>('Agregar');
  confirm = output<void>();
  secondClick = output<void>();
  secondTxt = input<string | null>(null);

  handleConfirm() {
    this.confirm.emit();
  }

  handleSecondClick() {
    this.secondClick.emit();
  }
}
