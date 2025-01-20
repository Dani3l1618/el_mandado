import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  ModalController,
  Platform,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';

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
export class SharedDialogHeaderComponent implements OnInit, OnDestroy {
  title = input<string>('El mandado');
  private modalController = inject(ModalController);
  private platform = inject(Platform);
  private backBtnSub?: Subscription;

  ngOnInit(): void {
    this.backBtnSub = this.platform.backButton.subscribeWithPriority(
      999,
      () => {
        this.cancel();
        console.log('cerrando modal');
      },
    );
  }

  ngOnDestroy(): void {
    this.backBtnSub?.unsubscribe();
  }

  cancel() {
    this.modalController.dismiss(undefined, 'cancel');
  }
}
