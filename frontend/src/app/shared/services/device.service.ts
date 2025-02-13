import { Injectable, signal } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { ShowOptions, SplashScreen } from '@capacitor/splash-screen';
import { Animation, StatusBar } from '@capacitor/status-bar';
import { APP_COLORS } from '../constants/color.model';
import { HELLO_MESSAGE, SPLASH_SCREEN_SHOW } from '../constants/defaults';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private handlers: PluginListenerHandle[] = [];

  keyboardOnScreen = signal(false);

  public changeStatusBarColor(color = APP_COLORS.background) {
    StatusBar.setBackgroundColor({ color }).catch((e) =>
      console.log(HELLO_MESSAGE),
    );
  }

  public async changeStatusBarPosition(show: boolean) {
    try {
      if (show) {
        await StatusBar.show({
          animation: Animation.Fade,
        });
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
    try {
      await this.hideSplashScreen();
      this.changeStatusBarColor(APP_COLORS.splash);
      return this.showSplashScreen();
    } catch {
      console.log(HELLO_MESSAGE);
    }
  }

  public async detectKeyboard(): Promise<void> {
    const hideHanlder = await Keyboard.addListener('keyboardWillHide', () => {
      this.keyboardOnScreen.set(false);
    });

    const openHandler = await Keyboard.addListener(
      'keyboardDidShow',
      (info) => {
        this.keyboardOnScreen.set(true);
      },
    );

    this.handlers.push(...[hideHanlder, openHandler]);
  }

  public stopDeviceListeners(): void {
    this.handlers.forEach((item) => item.remove());
  }
}
