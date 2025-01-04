import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  edad: { type: Number, required: true }
});

export const Usuario = model('Usuario', UsuarioSchema);
