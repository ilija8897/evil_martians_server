import { userService } from "../services/user-service.js";
import { validationResult } from "express-validator";

const userController = {
  registration: async (req: any, res: any, next: any) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) throw new Error("Невалидные данные!");
      const { email, password } = req.body;
      const userData: any = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken);
      res.json(userData);
    } catch (e) {
      res.json(e);
    }
  },
  activation: async (req: any, res: any) => {
    try {
      const activationLink = req.params.id;
      await userService.activation(activationLink);
      res.redirect("https://evil-martians.onrender.com/");
    } catch (e) {
      console.log(e);
    }
  },
  getData: async (
    req: any,
    res: { json: (arg: Record<string, string>) => any },
    next: any
  ) => {
    try {
      return res.json({ status: "SUCCESS" });
    } catch (e) {
      console.log("ERROR", e);
    }
  },
};
export default userController;
