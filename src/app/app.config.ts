import { DEFAULT_CURRENCY_CODE, EnvironmentProviders, LOCALE_ID, Provider } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { routes } from './app.routes';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import {registerLocaleData} from "@angular/common"
import localeMX from "@angular/common/locales/es-MX";

registerLocaleData(localeMX, "es-Mx");

const APP_CONFIG: (Provider | EnvironmentProviders)[] = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideIonicAngular(),
  provideRouter(routes, withPreloading(PreloadAllModules)),
  {provide: LOCALE_ID, useValue: "es-Mx"},
  // {provide: DEFAULT_CURRENCY_CODE, useValue: 'en-US' }

];

export default APP_CONFIG;