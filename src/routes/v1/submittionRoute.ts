import express from "express";

import { addSubmition } from "../../controllers/submitionController";
import { createSubmiionZodSchema } from "../../dtos/createSubmitionDto";
import { validate } from "../../validators/createSubmitionValidator";

const submitionRoute = express.Router();

submitionRoute.post("/", validate(createSubmiionZodSchema), addSubmition);

export default submitionRoute;