import { Document, Model, model, Schema } from 'mongoose';

export interface ICruiser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  locationLatitude: number;
  locationLongitude: number;
  numberOfRides: number;
  rating: number;
}

const CruiserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  locationLatitude: {
    type: Number,
    required: true,
  },
  locationLongitude: {
    type: Number,
    required: true,
  },
  numberOfRides: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default CruiserSchema;
