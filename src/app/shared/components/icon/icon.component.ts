import { Component, computed, input, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IonIcon, IonSelect } from '@ionic/angular/standalone';
import { IconName } from '../../models/icon.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [IonIcon, NgClass, IonSelect],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  private readonly iconPath = "assets/icon/";
  
  name = input<IconName>();
  src = input<string>();
  cssClass = input<string>();
  slot = input<string>("");
  color = input<string>("");

  srcIcon = computed(()=>{
    if(this.src()=== undefined) return undefined;

    return `${this.iconPath}${this.src()}`
  })

}
