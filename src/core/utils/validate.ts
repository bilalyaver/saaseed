import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    }
    (req as any).validatedBody = parsed.data;
    next();
  };