import { Schema, model } from 'mongoose';
import BackupSchema from './backup.model';

const StoresSchema = new Schema({
  chain: { type: String, required: true },
  city: { type: String, required: true },
  colonia: { type: String, required: true },
  id: { type: String, required: true },
  img: { type: String, required: true },
  lastUpdate: { type: Date, required: true },
  postalCode: { type: String, required: true },
  state: { type: String, required: true },
  street: { type: String, required: true }
});

const StoresBkupSchema = BackupSchema(StoresSchema);

export const Store = model('Store', StoresBkupSchema);

export interface StoreDTO {
  chain: string;
  city: string;
  colonia: string;
  id: string;
  img: string;
  lastUpdate: Date;
  postalCode: string;
  state: string;
  street: string;
}
