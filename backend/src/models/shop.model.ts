import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  barcode: { type: String, required: false },
  price: { type: Number, required: true }
});

const ShopSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shopDate: { type: Date, required: true },
  storeId: { type: String, required: true },
  budget: { type: Number, required: true },
  total: { type: Number, required: true },
  items: { type: [ItemSchema], required: true },
  time: { type: Number, required: true },
  type: { type: String, required: true }
});

export const Shop = model('Shop', ShopSchema);
