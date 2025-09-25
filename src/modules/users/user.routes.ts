import { Router } from "express";
import { UsersController } from "./user.controller";
import { z } from "zod";
import { validate } from "@core/utils/validate";
import { authGuard } from "@core/middlewares/auth.guard";
import { tenantGuard } from "@core/middlewares/tenant.guard";
import { requireRole } from "@core/middlewares/rbac.guard";

const router = Router();
const controller = new UsersController();

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "member"])
});

router.get("/",  authGuard, tenantGuard, requireRole(["superadmin","admin"]), controller.list);
router.post("/", authGuard, tenantGuard, requireRole(["superadmin","admin"]), validate(createUserSchema), controller.create);

export default router;