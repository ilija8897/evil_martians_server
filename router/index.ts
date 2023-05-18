import { Router } from "express";
import userController from "../controller/user-controller.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout");
router.get("/activate/:id", userController.activation);
router.post("/refresh");
router.post("/get-data", userController.getData);

export default router;
