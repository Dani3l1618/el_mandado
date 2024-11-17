import { inject, Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalController = inject(ModalController);

  async openModal<R>(options: ModalOptions): Promise<R | undefined> {
    const currentModal = await this.modalController.create({
      backdropDismiss: false,
      ...options,
    });

    await currentModal.present();

    const { data } = await currentModal.onWillDismiss<R>();

    return data;
  }
}
