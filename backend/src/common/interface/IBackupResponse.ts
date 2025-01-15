export interface BackupIdResponse {
  drafts: string | null;
  archives: string | null;
  stores: string | null;
}

export interface BackupResponse {
  date: Date;
  backupID: string | BackupIdResponse;
}
