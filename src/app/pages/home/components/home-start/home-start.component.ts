import { Component, inject } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/app.routes';
import { NavigateService } from 'src/app/shared';
const imports = [IonButton];

@Component({
  selector: 'app-home-start',
  templateUrl: './home-start.component.html',
  styleUrls: ['./home-start.component.scss'],
  standalone: true,
  imports,
})
export class HomeStartComponent {
  private navigateService = inject(NavigateService);

  navigateToMenu(): void {
    this.navigateService.navigateTo(AppRoutes.menu);
  }
}
