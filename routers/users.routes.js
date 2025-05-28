import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/user.controller.js";

import {
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router
  .route("/")
  .post(validateBody(createUserSchema), create)
  .get(getAll);

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(
    validateParams(idParamSchema),
    validateBody(updateUserSchema),
    update
  )
  .delete(validateParams(idParamSchema), remove);

export default router;
