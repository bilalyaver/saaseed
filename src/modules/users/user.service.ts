import { AppError } from "@core/utils/error";
import { UserModel } from "./user.model";

export class UsersService {
  async list(tenantId: string) {
    return UserModel.find({ tenantId }).select("_id email role tenantId createdAt");
  }

  async create(tenantId: string, email: string, passwordHash: string, role: "admin" | "member") {
    const exists = await UserModel.findOne({ email });
    if (exists && exists.tenantId?.toString() !== tenantId) {
      throw new AppError("Email belongs to another tenant", 400);
    }
    if (exists) return exists; // aynı tenant'ta zaten varsa geri dön

    return UserModel.create({ email, passwordHash, role, tenantId });
  }
}