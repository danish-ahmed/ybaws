import { Router } from "express";
import auth from "./auth";
import user from "./user";

import * as multer from "multer";
var upload = multer();

const routes = Router();

routes.use("/user",[upload.none()], user);
routes.use("/auth",[upload.none()], auth);

export default routes;
