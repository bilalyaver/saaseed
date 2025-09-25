import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  _id: string | Schema.Types.ObjectId;
  email: string;
  passwordHash: string;
  role: "superadmin" | "owner" | "admin" | "member";
  tenantId: string | Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["owner", "admin", "member"], default: "member" },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true }
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);