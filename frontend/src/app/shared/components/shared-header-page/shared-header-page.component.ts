import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { APP_COLORS } from '../../models/color.model';
import { StatusBarService } from '../../services/status-bar.service';

const imports = [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle];

@Component({
  selector: 'app-shared-header-page',
  templateUrl: './shared-header-page.component.html',
  styleUrls: ['./shared-header-page.component.scss'],
  standalone: true,
  imports,
})
export class SharedHeaderPageComponent implements OnInit, OnDestroy {
  private statusBarService = inject(StatusBarService);
  defaultHref = input.required<string>();
  title = input.required<string>();

  ngOnInit() {
    console.log('view enter');
    this.statusBarService.changeColor(APP_COLORS.primary);
  }

  ngOnDestroy() {
    console.log('view leave');
    this.statusBarService.changeColor();
  }
}
