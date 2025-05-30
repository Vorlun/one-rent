import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/users.controller.js";

import {
  createUsersSchema,
  updateUsersSchema,
} from "../validations/users.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router
  .route("/")
  .post(validateBody(createUsersSchema), create)
  .get(getAll);

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(
    validateParams(idParamSchema),
    validateBody(updateUsersSchema),
    update
  )
  .delete(validateParams(idParamSchema), remove);

export default router;
