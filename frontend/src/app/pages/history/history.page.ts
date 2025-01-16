import { Component, inject, OnInit } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/AppRoutes';
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
  private backButton = inject(Platform).backButton;
  defaultHref = AppRoutes.home;

  constructor() {
    this.backButton.subscribeWithPriority(10, () => {
      this.historyService.returnHome();
    });
  }

  ngOnInit(): void {
    this.historyService.getArchiveLists();
  }
}
