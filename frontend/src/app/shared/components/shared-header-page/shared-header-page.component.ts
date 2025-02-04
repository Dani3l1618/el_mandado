import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { APP_COLORS } from '../../constants/color.model';
import { DeviceService } from '../../services/device.service';

const imports = [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle];

@Component({
  selector: 'app-shared-header-page',
  templateUrl: './shared-header-page.component.html',
  styleUrls: ['./shared-header-page.component.scss'],
  standalone: true,
  imports,
})
export class SharedHeaderPageComponent implements OnInit, OnDestroy {
  private statusBarService = inject(DeviceService);
  defaultHref = input.required<string>();
  title = input.required<string>();

  ngOnInit() {
    console.log('view enter');
    this.statusBarService.changeStatusBarColor(APP_COLORS.primary);
  }

  ngOnDestroy() {
    console.log('view leave');
    this.statusBarService.changeStatusBarColor();
  }
}
