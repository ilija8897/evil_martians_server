import { Response, Request, NextFunction } from "express";
import { ApiError } from "../exceptions/api-errors.js";

export const ErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message, errors: err.message });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
