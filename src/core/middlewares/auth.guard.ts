import { config } from "@core/utils/config";
import { AppError } from "@core/utils/error";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export interface ReqUser {
  sub: string | any;
  tenantId?: string;
  role?: "owner" | "admin" | "member";
}

declare global {
  namespace Express {
    interface Request { user?: ReqUser }
  }
}

export function authGuard(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw new AppError("Unauthorized", 401);

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as Secret) as JwtPayload;
    req.user = {
      sub: typeof decoded.sub === "string" ? decoded.sub : decoded.sub,
      tenantId: (decoded as any).tenantId,
      role: (decoded as any).role
    };
    if (!req.user?.sub) throw new AppError("Unauthorized", 401);
    next();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
}