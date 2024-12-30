import { Component, computed, inject, model } from '@angular/core';
import { IonButton, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/app.routes';
import { NavigateService } from 'src/app/shared';
import { HomeMenuComponent } from '../home-menu/home-menu.component';

const imports = [IonButton, IonIcon, IonPopover, HomeMenuComponent];

@Component({
  selector: 'app-home-start',
  templateUrl: './home-start.component.html',
  styleUrls: ['./home-start.component.scss'],
  imports,
})
export class HomeStartComponent {
  private readonly navigateService = inject(NavigateService);
  protected showMenu = model(false);
  protected btnColor = computed(() =>
    this.showMenu() ? 'primary' : 'secondary',
  );

  navigateToMenu(): void {
    this.navigateService.navigateTo(AppRoutes.menu);
  }
}
