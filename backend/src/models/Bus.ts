import mongoose, { Document, Schema } from 'mongoose';

export interface IBus extends Document {
  id: string;
  route: string;
  currentStop: string;
  nextStop: string;
  eta: number;
  occupancy: number;
  lat: number;
  lng: number;
  status: 'on-time' | 'delayed' | 'early' | 'maintenance';
}

const BusSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  currentStop: { type: String, required: true },
  nextStop: { type: String, required: true },
  eta: { type: Number, required: true },
  occupancy: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  status: { type: String, enum: ['on-time', 'delayed', 'early', 'maintenance'], default: 'on-time' },
});

export default mongoose.model<IBus>('Bus', BusSchema);