import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/machineTypes.controller.js";

import {
  createMachineTypeSchema,
  updateMachineTypeSchema,
} from "../validations/machineTypes.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router
  .route("/")
  .post(validateBody(createMachineTypeSchema), create)
  .get(getAll);

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(
    validateParams(idParamSchema),
    validateBody(updateMachineTypeSchema),
    update
  )
  .delete(validateParams(idParamSchema), remove);

export default router;
