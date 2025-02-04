import { Injectable } from '@angular/core';
import { ShowOptions, SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { APP_COLORS } from '../constants/color.model';
import { HELLO_MESSAGE, SPLASH_SCREEN_SHOW } from '../constants/defaults';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public changeStatusBarColor(color = APP_COLORS.background) {
    StatusBar.setBackgroundColor({ color }).catch((e) =>
      console.log(HELLO_MESSAGE),
    );
  }

  public async changeStatusBarPosition(show: boolean) {
    try {
      if (show) {
        await StatusBar.show();
      } else {
        await StatusBar.hide();
      }
    } catch {
      console.log(HELLO_MESSAGE);
    }
  }

  public overlayStatusBar(overlay: boolean) {
    StatusBar.setOverlaysWebView({ overlay });
  }

  public async showSplashScreen(
    options: ShowOptions = SPLASH_SCREEN_SHOW,
  ): Promise<void> {
    return SplashScreen.show({ ...options });
  }

  public async hideSplashScreen(): Promise<void> {
    return SplashScreen.hide();
  }

  public async initializeSplashScreen(): Promise<void> {
    await this.hideSplashScreen();
    this.changeStatusBarColor(APP_COLORS.splash);
    return this.showSplashScreen();
  }
}
