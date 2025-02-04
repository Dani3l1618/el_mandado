import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { HELLO_MESSAGE } from '../constants/defaults';
import { APP_COLORS } from '../models/color.model';

@Injectable({
  providedIn: 'root',
})
export class StatusBarService {
  public changeColor(color = APP_COLORS.background) {
    StatusBar.setBackgroundColor({ color }).catch((e) =>
      console.log(HELLO_MESSAGE),
    );
  }

  public async changePosition(show: boolean) {
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

  public overlay(overlay: boolean) {
    StatusBar.setOverlaysWebView({ overlay });
  }
}
