import { userService } from "../services/user-service.js";

const userController = {
  registration: async (
    req: any,
    res: { json: (arg: string[]) => any },
    next: any
    // eslint-disable-next-line consistent-return
  ) => {
    console.log(req);
    try {
      const { email, password } = req.body;
      const userData: any = await userService.registration(email, password);
      console.log(userData);
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  },
  getData: async (
    req: any,
    res: { json: (arg: Record<string, string>) => any },
    next: any
    // eslint-disable-next-line consistent-return
  ) => {
    console.log("REQ", req);
    try {
      return res.json({ status: "SUCCESS" });
    } catch (e) {
      console.log(e);
    }
  },
};
export default userController;
