import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeMX from '@angular/common/locales/es-MX';
import { EnvironmentProviders, LOCALE_ID, Provider } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import player from 'lottie-web';
import { provideLottieOptions } from 'ngx-lottie';
import { routes } from './app.routes';

registerLocaleData(localeMX, 'es-Mx');


const APP_CONFIG: (Provider | EnvironmentProviders)[] = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideLottieOptions({ player: () => player }),
  provideIonicAngular(),
  provideRouter(routes, withPreloading(PreloadAllModules)),
  { provide: LOCALE_ID, useValue: 'es-Mx' },
  provideHttpClient(),
];

export default APP_CONFIG;
