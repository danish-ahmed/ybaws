import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router();

router.post("/signup",UserController.newUser);

export default router;