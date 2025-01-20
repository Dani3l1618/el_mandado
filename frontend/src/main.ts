import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import APP_CONFIG from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: APP_CONFIG,
}).catch((error) => {
  console.log('[APP CONSOLE] ERROR: ', error);
});
