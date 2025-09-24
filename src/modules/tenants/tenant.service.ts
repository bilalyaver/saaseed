import { TenantModel } from "./tenant.model";
import argon2 from "argon2";
import crypto from "crypto";
import { AppError } from "@core/utils/error";
import { UserModel } from "@modules/auth/user.model";

export class TenantService {
  async createTenant(ownerUserId: string, name: string) {
    const owner = await UserModel.findById(ownerUserId);
    if (!owner) throw new AppError("Owner user not found", 404);

    // Zaten tenant'ı varsa aynı tenant'a ikinci kez owner yapma
    if (owner.tenantId) throw new AppError("User already has a tenant", 400);

    const tenant = await TenantModel.create({ name, ownerId: owner._id });
    owner.tenantId = tenant?._id.toString();
    owner.role = "owner";
    await owner.save();

    return tenant;
  }

  async getMyTenant(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user?.tenantId) throw new AppError("Tenant not found", 404);
    const tenant = await TenantModel.findById(user.tenantId);
    if (!tenant) throw new AppError("Tenant not found", 404);
    return tenant;
  }

  async inviteUser(tenantId: string, email: string, role: "admin" | "member") {
    const existing = await UserModel.findOne({ email });
    if (existing && existing.tenantId?.toString() !== tenantId.toString()) {
      throw new AppError("User belongs to another tenant", 400);
    }

    if (existing) {
      existing.tenantId = tenantId;
      existing.role = role;
      await existing.save();
      return { userId: existing._id, tempPassword: null };
    }

    // Yeni kullanıcı için geçici parola
    const temp = crypto.randomBytes(8).toString("base64url");
    const passwordHash = await argon2.hash(temp);
    const user = await UserModel.create({
      email,
      passwordHash,
      role,
      tenantId
    });
    // Mail gönderimi v0'da dummy; temp şifreyi response'a koyuyoruz
    return { userId: user._id, tempPassword: temp };
  }
}