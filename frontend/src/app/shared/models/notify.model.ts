import { ToastOptions } from '@ionic/angular/standalone';

export type NotifyOptions = Omit<ToastOptions, 'messagge'> & {
  message: string;
};
