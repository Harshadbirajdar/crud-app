/* eslint-disable no-unused-vars */
import { Schema, model, Types, Document } from "mongoose";

export interface IClient extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  address: string;
}

const clientSchema = new Schema<IClient>({
  firstName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  id: {
    type: Schema.Types.Number,
    required: true,
    unique: true,
  },
  address: {
    type: Schema.Types.String,
    trim: true,
  },
});

const ClientModel = model<IClient>("Client", clientSchema);
export default ClientModel;
