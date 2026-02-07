import express from "express";

import { pingCheck } from "../../controllers/pingController";
import submitionRoute from "./submittionRoute";

const v1Router = express.Router();

v1Router.get("/ping", pingCheck);

v1Router.use("/submitions", submitionRoute);

export default v1Router;