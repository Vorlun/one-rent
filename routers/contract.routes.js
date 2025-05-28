import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/contract.controller.js";

import {
  createContractSchema,
  updateContractSchema,
} from "../validations/contract.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router
  .route("/")
  .post(validateBody(createContractSchema), create)
  .get(getAll);

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(
    validateParams(idParamSchema),
    validateBody(updateContractSchema),
    update
  )
  .delete(validateParams(idParamSchema), remove);

export default router;
