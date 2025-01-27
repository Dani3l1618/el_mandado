import { HttpAppResponse } from 'src/app/shared';
import { ListShop } from '../../list-shop';
import { Store } from '../../tiendas/models';

export interface BackupMetadata<Data> {
  _id: string;
  date: string;
  type?: string;
  data: Data;
}

export interface SyncBackup {
  stores: Store[];
  drafts: ListShop[];
  archives: ListShop[];
}

export interface SyncRestore {
  stores: BackupMetadata<Store[]>;
  drafts: BackupMetadata<ListShop[]> | null;
  archives: BackupMetadata<ListShop[]> | null;
}

export interface SyncBackupDataResponse {
  date: string;
  backupId: string[];
}

export type SyncBackupResponse = HttpAppResponse<SyncBackupDataResponse>;
export type SyncRestoreResponse = HttpAppResponse<SyncRestore>;
