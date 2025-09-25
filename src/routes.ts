import { Router } from "express";
const router = Router();
import authRoutes from "@modules/auth/auth.routes";
import tenantRoutes from "@modules/tenants/tenant.routes";
import usersRoutes from "@modules/users/user.routes";
import { authGuard } from "@core/middlewares/auth.guard";

// Health check
router.get("/health",authGuard, (_req, res) => {
    res.sendSuccess({ ok: true }, "Server is healthy");
});

// Modül rotaları
router.use("/auth", authRoutes);
router.use("/tenants", tenantRoutes);
router.use("/users", usersRoutes);

export default router;