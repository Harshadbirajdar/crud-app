/* eslint-disable no-unused-vars */
import { Schema, model, Types, Document, Model } from "mongoose";

export interface IClient extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  address: string;
}

interface IClientMethod extends Model<IClient> {
  isIdExist(id: number): boolean;
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

clientSchema.statics.isIdExist = async function (id, excludeUserId) {
  const client = await this.findOne({ id, _id: { $ne: excludeUserId } });
  return !!client;
};
const ClientModel = model<IClient, IClientMethod>("Client", clientSchema);
export default ClientModel;
