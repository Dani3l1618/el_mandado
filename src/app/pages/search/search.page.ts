import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/app.routes';
import { SharedHeaderPageComponent } from 'src/app/shared/components/shared-header-page/shared-header-page.component';

const imports = [IonContent, SharedHeaderPageComponent];

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  imports,
})
export class SearchPage {
  defaultHref = AppRoutes.menu;
}
