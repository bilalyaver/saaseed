import { Schema, model, Document } from "mongoose";

export interface ITenant extends Document {
  _id: string | Schema.Types.ObjectId;
  name: string;
  ownerId: string | Schema.Types.ObjectId;
}

const tenantSchema = new Schema<ITenant>(
  {
    name: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const TenantModel = model<ITenant>("Tenant", tenantSchema);