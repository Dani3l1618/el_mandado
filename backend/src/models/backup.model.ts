import { Schema } from 'mongoose';

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
