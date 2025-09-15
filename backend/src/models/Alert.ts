import mongoose, { Document, Schema } from 'mongoose';

export interface IAlert extends Document {
  id: number;
  type: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}

const AlertSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAlert>('Alert', AlertSchema);