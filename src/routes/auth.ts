import { Router } from "express";
import * as AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.post("/login", AuthController.login);
router.post("/logout", [checkJwt],AuthController.logout);


export default router;