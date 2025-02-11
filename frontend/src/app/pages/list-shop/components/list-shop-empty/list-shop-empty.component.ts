import { Component, signal } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ANIMATION_SOURCE } from 'src/app/shared';

const imports = [IonText, LottieComponent];
@Component({
  selector: 'app-list-shop-empty',
  templateUrl: './list-shop-empty.component.html',
  styleUrls: ['./list-shop-empty.component.scss'],
  standalone: true,
  imports,
})
export class ListShopEmptyComponent {
  options = signal<AnimationOptions>({
    path: ANIMATION_SOURCE.bascket,
    loop: true,
    autoplay: true,
  });
}
