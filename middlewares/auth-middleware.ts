import { Response, Request, NextFunction } from "express";
import { ApiError } from "../exceptions/api-errors.js";
import { tokenService } from "../services/token-service.js";

export const AuthMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
      return next(ApiError.UnauthtorizedError());
    }

    const accessToken = authHeader.split(" ")[1];
    console.log(accessToken);

    if (!accessToken) {
      return next(ApiError.UnauthtorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    console.log(userData);

    if (!userData) {
      return next(ApiError.UnauthtorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthtorizedError());
  }
};
