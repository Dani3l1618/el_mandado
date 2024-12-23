import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/app.routes';
import { SharedHeaderPageComponent } from 'src/app/shared/components/shared-header-page/shared-header-page.component';
import { HistoryFilterComponent } from './components/history-filter/history-filter.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { HistoryService } from './services/history.service';

const imports = [
  IonContent,
  HistoryListComponent,
  HistoryFilterComponent,
  SharedHeaderPageComponent,
];
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports,
  providers: [HistoryService],
})
export class HistoryPage implements OnInit {
  private historyService = inject(HistoryService);
  defaultHref = AppRoutes.menu;

  ngOnInit(): void {
    console.log(
      '%ctodo: Al seleccionar un item, redirigir a pantalla de detalle',
      'color: #1a4704; background-color: #d0f0c0;',
    );
    this.historyService.getArchiveLists();
  }
}
