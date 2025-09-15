import mongoose, { Document, Schema } from 'mongoose';

export interface IRoute extends Document {
  id: string;
  name: string;
  buses: number;
  avgDelay: number;
  efficiency: number;
}

const RouteSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  buses: { type: Number, required: true },
  avgDelay: { type: Number, required: true },
  efficiency: { type: Number, required: true },
});

export default mongoose.model<IRoute>('Route', RouteSchema);