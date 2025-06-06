import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
  highRatingMachines,
} from "../controllers/machines.controller.js";

import {
  createMachineSchema,
  updateMachineSchema,
} from "../validations/machines.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router.route("/").post(validateBody(createMachineSchema), create).get(getAll);

router.get("/high", highRatingMachines)

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(validateParams(idParamSchema), validateBody(updateMachineSchema), update)
  .delete(validateParams(idParamSchema), remove);

export default router;
