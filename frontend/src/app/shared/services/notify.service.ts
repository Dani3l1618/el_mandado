import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { DEFAULT_NOTIFY_CONFIG } from '../constants/notify.config';
import { NotifyOptions } from '../models/notify.model';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private readonly toastController = inject(ToastController);

  public async presentSucccess(options: NotifyOptions) {
    const successOptions = { ...options, color: 'primary' };

    await this.notify(successOptions);
  }

  public async presentError(options: NotifyOptions) {
    const errorOptions = { ...options, color: 'secondary' };

    await this.notify(errorOptions);
  }

  public async notify(options?: NotifyOptions) {
    const toast = await this.toastController.create({
      ...DEFAULT_NOTIFY_CONFIG,
      ...options,
    });

    await toast.present();
  }
}
