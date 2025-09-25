import { Request, Response, NextFunction } from "express";

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}

declare global {
  namespace Express {
    interface Response {
      sendSuccess: (data?: any, message?: string, code?: number) => this;
      sendError: (error: any, code?: number) => this;
    }
  }
}

export function responseEnhancer(req: Request, res: Response, next: NextFunction) {
  res.sendSuccess = function (data?: any, message = "OK", code = 200) {
    const body: ApiResponse = {
      success: true,
      message,
      data,
    };
    return this.status(code).json(body);
  };

  res.sendError = function (error: any, code = 400) {
    const body: ApiResponse = {
      success: false,
      error: typeof error === "string" ? { message: error } : error,
    };
    return this.status(code).json(body);
  };

  next();
}