import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { APP_COLORS } from '../models/color.model';

@Injectable({
  providedIn: 'root',
})
export class StatusBarService {
  public changeColor(color = APP_COLORS.background) {
    console.log('status bar color ', color);
    StatusBar.setBackgroundColor({ color });
  }

  public changePosition(show: boolean) {
    if (show) {
      StatusBar.show();
    } else {
      StatusBar.hide();
    }
  }

  public overlay(overlay: boolean) {
    StatusBar.setOverlaysWebView({ overlay });
  }
}
