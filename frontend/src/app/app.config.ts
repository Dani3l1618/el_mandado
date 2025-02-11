import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeMX from '@angular/common/locales/es-MX';
import {
  EnvironmentProviders,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  Provider,
} from '@angular/core';
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
import { DeviceService } from './shared';

registerLocaleData(localeMX, 'es-Mx');

const splashScreen = async () => {
  const deviceService = inject(DeviceService);
  await deviceService.initializeSplashScreen();
};

const APP_CONFIG: (Provider | EnvironmentProviders)[] = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideLottieOptions({ player: () => player }),
  provideIonicAngular(),
  provideRouter(routes, withPreloading(PreloadAllModules)),
  { provide: LOCALE_ID, useValue: 'es-Mx' },
  provideHttpClient(),
  provideAppInitializer(() => splashScreen()),
];

export default APP_CONFIG;
