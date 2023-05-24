import { Router } from "express";
import userController from "../controller/user-controller.js";
import { body } from "express-validator";
import { AuthMiddleware } from "../middlewares/auth-middleware.js";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:id", userController.activation);
router.post("/refresh");
router.post("/get-data", AuthMiddleware, userController.getData);

export default router;
