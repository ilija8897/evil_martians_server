import { Router } from "express";
import userController from "../controller/user-controller.js";

const router = Router();

router.post("/registration", userController.registration);
router.post("/login");
router.post("/logout");
router.get("/activate/:id", userController.activation);
router.post("/refresh");
router.post("/get-data", userController.getData);

export default router;
