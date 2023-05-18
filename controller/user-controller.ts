import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user-service.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-errors.js";

const userController = {
  registration: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty())
        throw ApiError.BadRequest("Невалидные данные!");
      const { email, password } = req.body;
      const userData: any = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  },
  activation: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activationLink = req.params.id;
      await userService.activation(activationLink);
      res.redirect("https://evil-martians.onrender.com/");
    } catch (e) {
      next(e);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  },
  getData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({ status: "SUCCESS" });
    } catch (e) {
      next(e);
    }
  },
};
export default userController;
