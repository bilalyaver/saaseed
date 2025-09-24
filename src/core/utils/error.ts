import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = (err as AppError).statusCode || 500;
  logger.error({ err, path: req.path }, "Error occurred");

  res.status(statusCode).json({
    error: err.message || "Internal Server Error"
  });
}