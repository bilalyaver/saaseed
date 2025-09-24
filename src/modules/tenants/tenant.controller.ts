import { Request, Response } from "express";
import { TenantService } from "./tenant.service";
import { AppError } from "@core/utils/error";

const service = new TenantService();

export class TenantController {
  create = async (req: Request, res: Response) => {
    const ownerId = req.user?.sub;
    const { name } = req.body as { name: string };
    if (!ownerId) throw new AppError("Unauthorized", 401);
    const tenant = await service.createTenant(ownerId, name);
    res.json(tenant);
  };

  me = async (req: Request, res: Response) => {
    const userId = req.user?.sub!;
    const tenant = await service.getMyTenant(userId);
    res.json(tenant);
  };

  invite = async (req: Request, res: Response) => {
    const { email, role } = req.body as { email: string; role: "admin" | "member" };
    const tenantId = req.user?.tenantId!;
    const result = await service.inviteUser(tenantId, email, role);
    res.json(result);
  };
}