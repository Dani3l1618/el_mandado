import { NgClass } from '@angular/common';
import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { IconName } from '../../models/icon.model';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    imports: [IonIcon, NgClass],
    encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  private readonly iconPath = 'assets/icon/';

  name = input<IconName>();
  src = input<string>();
  cssClass = input<string>();
  slot = input<string>('');
  color = input<string>('');

  srcIcon = computed(() => {
    if (this.src() === undefined) return undefined;

    return `${this.iconPath}${this.src()}`;
  });
}
