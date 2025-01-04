import { Schema, model } from 'mongoose';

const StoresSchema = new Schema({
  chain: { type: String, required: true },
  city: { type: String, required: true },
  colonia: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  lastUpdate: { type: Date, required: true },
  postalCode: { type: String, required: true },
  state: { type: String, required: true },
  street: { type: String, required: true }
});

export const Store = model('Store', StoresSchema);
