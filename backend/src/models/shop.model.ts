import { Schema, model } from 'mongoose';
import BackupSchema from './backup.model';

const ItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  barcode: { type: String, required: false },
  price: { type: Number, required: true },
  promo: {
    type: String,
    required: false,
    validator: (v: string) => /^\d+x\d+(\.\d+)?$/.test(v)
  }
});

const ShopSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  shopDate: { type: Date, required: true },
  storeId: { type: String, required: true },
  budget: { type: Number, required: true },
  total: { type: Number, required: true },
  items: { type: [ItemSchema], required: true },
  time: { type: Number, required: true }
});

const ShopBkupSchema = BackupSchema(ShopSchema);

export const Shop = model('Shop', ShopBkupSchema);

export interface ItemDTO {
  id: string;
  name: string;
  quantity: number;
  barcode: string;
  price: number;
}

export interface ShopDTO {
  id: string;
  name: string;
  shopDate: string;
  storeId: string;
  budget: number;
  total: number;
  items: ItemDTO[];
  time: number;
}