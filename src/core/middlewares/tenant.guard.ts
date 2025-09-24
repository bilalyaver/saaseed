import { AppError } from "@core/utils/error";
import { Request, Response, NextFunction } from "express";

export function tenantGuard(req: Request, _res: Response, next: NextFunction) {
  const t = req.user?.tenantId;
  if (!t) throw new AppError("Tenant context required", 400);
  next();
}