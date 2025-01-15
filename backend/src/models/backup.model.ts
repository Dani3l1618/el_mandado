import { Schema } from 'mongoose';
import { ShopDTO } from './shop.model';
import { StoreDTO } from './store.model';

const BackupSchema = (schema: Schema) =>
  new Schema({
    date: { type: Date, required: true },
    type: { type: String, require: false },
    data: { type: [schema], require: true }
  });

export default BackupSchema;

export interface BackupDTO<Data> {
  date: Date;
  type?: string;
  data: Data[];
}

export interface AppDataBackup {
  stores: StoreDTO[];
  drafts: ShopDTO[];
  archives: ShopDTO[];
}

export interface AppDataBackupDto {
  stores: BackupDTO<StoreDTO> | null;
  drafts: BackupDTO<ShopDTO> | null;
  archives: BackupDTO<ShopDTO> | null;
}