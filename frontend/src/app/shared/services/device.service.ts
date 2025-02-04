import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { APP_COLORS } from '../constants/color.model';
import { HELLO_MESSAGE } from '../constants/defaults';

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
}
