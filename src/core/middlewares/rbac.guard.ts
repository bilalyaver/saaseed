import { AppError } from "@core/utils/error";
import { Request, Response, NextFunction } from "express";

export function requireRole(roles: Array<"owner" | "admin" | "member">) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) throw new AppError("Forbidden", 403);
    next();
  };
}