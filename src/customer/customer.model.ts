import { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  locationLatitude: number;
  locationLongitude: number;
  numberOfRides: number;
  rating: number;
}

const CustomerSchema: Schema = new Schema({
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

export default CustomerSchema;
