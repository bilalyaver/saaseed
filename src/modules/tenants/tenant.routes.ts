import { Router } from "express";
import { TenantController } from "./tenant.controller";
import { createTenantSchema, inviteSchema } from "./tenant.schemas";
import { authGuard } from "@core/middlewares/auth.guard";
import { validate } from "@core/utils/validate";
import { requireRole } from "@core/middlewares/rbac.guard";

const router = Router();
const controller = new TenantController();

router.post("/", authGuard, validate(createTenantSchema), controller.create);
router.get("/me", authGuard, controller.me);
router.post("/invite", authGuard, requireRole(["owner", "admin"]), validate(inviteSchema), controller.invite);

export default router;