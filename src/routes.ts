import { Router } from "express";
const router = Router();
import authRoutes from "@modules/auth/auth.routes";
import tenantRoutes from "@modules/tenants/tenant.routes";
import usersRoutes from "@modules/users/user.routes";

// Health check
router.get("/health", (_req, res) => {
    res.json({ ok: true });
});

// Modül rotaları
router.use("/auth", authRoutes);
router.use("/tenants", tenantRoutes);
router.use("/users", usersRoutes);

export default router;