import { UserModel } from "../users/user.model";
import { RefreshTokenModel } from "./tokens.model";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import argon2 from "argon2";
import { config } from "@core/utils/config";
import { AppError } from "@core/utils/error";
export class AuthService {
  async register(email: string, password: string, tenantId: string) {
    const exists = await UserModel.findOne({ email });
    if (exists) throw new AppError("User already exists", 400);

    const passwordHash = await argon2.hash(password);
    const user = await UserModel.create({ email, passwordHash, tenantId, role: "owner" });
    return user;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new AppError("Invalid credentials", 401);

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new AppError("Invalid credentials", 401);

    const payload: JwtPayload = {
      sub: user?._id.toString(),
      tenantId: user.tenantId.toString(),
      role: user.role
    };

    const secret: Secret = config.JWT_SECRET as Secret;

    const accessOpts: SignOptions = { expiresIn: config.ACCESS_TTL as unknown as SignOptions["expiresIn"] };
    const refreshOpts: SignOptions = { expiresIn: config.REFRESH_TTL as unknown as SignOptions["expiresIn"] };
    const accessToken = jwt.sign(payload, secret, accessOpts);
    const refreshToken = jwt.sign({ sub: payload.sub, type: "refresh" } as JwtPayload, secret, refreshOpts);

    await RefreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    // 1) DB'de var mı?
    const stored = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!stored) throw new AppError("Invalid refresh token", 401);

    try {
      const secret: Secret = config.JWT_SECRET as Secret;

      // 2) Token'ı doğrula
      const decoded = jwt.verify(refreshToken, secret) as JwtPayload;

      // (opsiyonel) tip kontrolü
      if (decoded?.type && decoded.type !== "refresh") {
        throw new AppError("Invalid refresh token", 401);
      }

      // 3) Kullanıcıyı bul
      const userId = typeof decoded.sub === "string" ? decoded.sub : decoded.sub;
      if (!userId) throw new AppError("Invalid refresh token", 401);

      const user = await UserModel.findById(userId);
      if (!user) throw new AppError("User not found", 404);

      // 4) Yeni access token üret
      const accessPayload: JwtPayload = {
        sub: user._id.toString(),
        tenantId: user.tenantId.toString(),
        role: user.role
      };
      const accessOpts: SignOptions = {
        expiresIn: config.ACCESS_TTL as unknown as SignOptions["expiresIn"]
      };

      const accessToken = jwt.sign(accessPayload, secret, accessOpts);

      // (opsiyonel) refresh rotation:
      // - eski refresh'i sil + yeni refresh üretip döndürmek istersen burada yaparsın.

      return { accessToken };
    } catch (e) {
      throw new AppError("Invalid refresh token", 401);
    }
  }

  async logout(refreshToken: string) {
    await RefreshTokenModel.deleteOne({ token: refreshToken });
  }
}