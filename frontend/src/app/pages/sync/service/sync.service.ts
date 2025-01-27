import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import {
  AppStorageService,
  DataService,
  EmptyDataError,
  HttpService,
} from 'src/app/shared';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ENDPOINTS } from 'src/environments/endpoints';
import {
  SyncBackup,
  SyncBackupResponse,
  SyncRestore,
  SyncRestoreResponse,
} from '../models/sync.model';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private readonly http = inject(HttpService);
  private readonly appStorge = inject(AppStorageService);
  private readonly notifyService = inject(NotifyService);
  private readonly dataService = inject(DataService);
  public backupSatate = signal(false);
  public restoreState = signal(false);
  public loading = computed(() => this.backupSatate() || this.restoreState());

  public async backup(host: string): Promise<Observable<SyncBackupResponse>> {
    this.backupSatate.set(true);
    const url = ENDPOINTS(host).backup;
    try {
      const appData = await this.retrieveAppData();
      return this.postBackup(url, appData);
    } catch (e) {
      this.notifyService.presentError({ message: (e as Error).message });
      this.backupSatate.set(false);
      console.log((e as Error).toString());
      return EMPTY;
    }
  }

  public restore(host: string): Observable<SyncRestoreResponse> {
    this.restoreState.set(true);
    const url = ENDPOINTS(host).backup;

    return this.http.get<SyncRestoreResponse>(url).pipe(
      tap(({ response }) => {
        this.restoreAppData(response);
      }),
      catchError((error) => {
        this.notifyService.presentError({
          message: 'Ocurrio un error al realizar el backup',
        });
        this.restoreState.set(false);
        return throwError(() => error);
      }),
    );
  }

  private async restoreAppData({ drafts, archives, stores }: SyncRestore) {
    try {
      await Promise.all([
        this.dataService.saveData('archives', archives?.data ?? []),
        this.dataService.saveData('drafts', drafts?.data ?? []),
        this.dataService.saveData('stores', stores.data),
      ]);

      this.notifyService.presentSucccess({
        message: 'Información restablecida con éxito',
      });
    } catch (e) {
      this.notifyService.presentError({
        message: 'Ocurrio un error al restablecer la información',
      });
    } finally {
      this.restoreState.set(false);
    }
  }

  private async retrieveAppData(): Promise<SyncBackup> {
    const stores = await this.appStorge.getStores();
    const archives = await this.appStorge.getArchives();
    const drafts = await this.appStorge.getDrafts();

    if (stores.length === 0)
      throw new EmptyDataError(
        'Para generar un backup, debe existir al menos una tienda guardada.',
      );

    return { stores, archives, drafts };
  }

  private postBackup(
    url: string,
    appData: SyncBackup,
  ): Observable<SyncBackupResponse> {
    return this.http.post<SyncBackupResponse, SyncBackup>(url, appData).pipe(
      tap(({ message }) => {
        this.backupSatate.set(false);
        this.notifyService.presentSucccess({ message });
      }),
      catchError((error) => {
        this.notifyService.presentError({
          message: 'Ocurrio un error al realizar el backup',
        });
        this.backupSatate.set(false);
        return throwError(() => error);
      }),
    );
  }
}
