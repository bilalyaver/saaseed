import { Schema, model, Document } from "mongoose";

export interface IRefreshToken extends Document {
  userId:  string | Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const tokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export const RefreshTokenModel = model<IRefreshToken>("RefreshToken", tokenSchema);