import { Component, computed, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
} from '@ionic/angular/standalone';
import { AppRoutes } from 'src/app/AppRoutes';
import { SharedHeaderPageComponent } from 'src/app/shared/components/shared-header-page/shared-header-page.component';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { SyncService } from './service/sync.service';

const imports = [
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
  FormsModule,

  SharedHeaderPageComponent,
];

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
  imports,
})
export class SyncPage {
  private readonly syncService = inject(SyncService);
  private readonly notifyService = inject(NotifyService);

  defaultHref = AppRoutes.home;
  host = model('http://192.168.68.101:3000');
  loading = this.syncService.loading;
  backupState = this.syncService.backupSatate.asReadonly();
  restoreState = this.syncService.restoreState.asReadonly();

  backupTxt = computed(() =>
    this.backupState() ? 'Respaldando' : 'Respaldar',
  );
  restoreTxt = computed(() =>
    this.restoreState() ? 'Restaurando' : 'Restaurar',
  );

  public async backup() {
    if (this.loading()) return;
    const apiCall = await this.syncService.backup(this.host());
    apiCall.subscribe();
  }

  public restore(): void {
    if (this.loading()) return;
    const apiCall = this.syncService.restore(this.host());
    apiCall.subscribe();
  }
}
