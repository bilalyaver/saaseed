import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema, refreshSchema } from "./auth.schemas";
import { validate } from "@core/utils/validate";

const router = Router();
const controller = new AuthController();

router.post("/register", validate(registerSchema), (req, res) => controller.register(req, res));
router.post("/login",    validate(loginSchema),    (req, res) => controller.login(req, res));
router.post("/refresh",  validate(refreshSchema),  (req, res) => controller.refresh(req, res));
router.post("/logout",   validate(refreshSchema),  (req, res) => controller.logout(req, res));

export default router;