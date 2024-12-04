import { inject, Injectable } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class GestureService {
  private gestureController = inject(GestureController);

  public doubleClick(element: Node, callback: () => void): Gesture {
    let lastOnStart = 0;
    const DOUBLE_CLICK_THRESHOLD = 500;

    const onDoubleClick = () => {
      const now = Date.now();

      if (Math.abs(now - lastOnStart) <= DOUBLE_CLICK_THRESHOLD) {
        callback();
        lastOnStart = 0;
      } else {
        lastOnStart = now;
      }
    };

    const gesture = this.createGesture(element, onDoubleClick);

    return gesture;
  }

  private createGesture(element: Node, callback: () => void): Gesture {
    const controller = this.gestureController.create(
      {
        el: element,
        threshold: 0,
        gestureName: 'double-click',
        onStart: callback,
        passive: false,
      },
      true,
    );

    return controller;
  }
}
