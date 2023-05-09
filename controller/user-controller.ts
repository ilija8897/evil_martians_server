import { userService } from "../services/user-service.js";

const userController = {
  registration: async (req: any, res: any, next: any) => {
    try {
      const { email, password } = req.body;
      const userData: any = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken);
      res.json(userData);
    } catch (e) {
      res.json(e);
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
