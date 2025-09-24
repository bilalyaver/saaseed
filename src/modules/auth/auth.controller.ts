import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password, tenantId } = req.body;
    const user = await authService.register(email, password, tenantId);
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.json(tokens);
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const token = await authService.refresh(refreshToken);
    res.json(token);
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ success: true });
  }
}