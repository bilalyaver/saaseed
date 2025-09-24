import { Request, Response } from "express";
import { UsersService } from "./user.service";
import argon2 from "argon2";
import { AppError } from "@core/utils/error";

const service = new UsersService();

export class UsersController {
  list = async (req: Request, res: Response) => {
    const tenantId = req.user!.tenantId!;
    const users = await service.list(tenantId);
    res.json(users);
  };

  create = async (req: Request, res: Response) => {
    const tenantId = req.user!.tenantId!;
    const { email, password, role } = req.body as { email: string; password: string; role: "admin"|"member" };
    if (!email || !password || !role) throw new AppError("email/password/role required", 400);
    const passwordHash = await argon2.hash(password);
    const user = await service.create(tenantId, email, passwordHash, role);
    res.status(201).json(user);
  };
}