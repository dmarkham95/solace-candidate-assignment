import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { ApiError } from "@/utils/api-error";
import { ZodError } from "zod";
import { ErrorResponse } from "@/types/error.types";

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: Error | ApiError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  logger.error(error);

  let statusCode = 500;
  const response: ErrorResponse = {
    message: "Internal Server Error",
  };

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    response.message = error.message;
    if (error.errors) {
      response.errors = error.errors;
    }
  } else if (error instanceof ZodError) {
    statusCode = 400;
    response.message = "Validation Error";
    response.errors = error.errors;
  }

  if (isDevelopment) {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};
