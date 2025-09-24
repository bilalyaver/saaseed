import { z } from "zod";

export const createTenantSchema = z.object({
  name: z.string().min(2)
});

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member"])
});