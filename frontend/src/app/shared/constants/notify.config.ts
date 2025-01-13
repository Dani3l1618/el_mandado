import { ToastOptions } from '@ionic/angular/standalone';

export const DEFAULT_NOTIFY_DURATION = 1000 * 5; //seconds

export const DEFAULT_NOTIFY_CONFIG: ToastOptions = {
  duration: DEFAULT_NOTIFY_DURATION,
  position: 'bottom',
  buttons: [
    {
      role: 'cancel',
      icon: 'close',
    },
  ],
};
