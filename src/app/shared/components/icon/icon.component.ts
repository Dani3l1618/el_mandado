import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { addIcons } from 'ionicons';
import { cash, cart, bag, map, calendarClear, logoIonic, pin, wallet, list} from 'ionicons/icons';
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
  @Input({required:true}) name: IconName = "logo-ionic";
  @Input() cssClass: string = "";
  @Input() slot: string = "";
  @Input() color:string = "";
  constructor() {
    addIcons({ cash, cart, bag, map, calendarClear, logoIonic, pin, wallet, list });
  }
}
