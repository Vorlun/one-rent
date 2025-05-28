import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/payment.controller.js";

import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../validations/payment.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router
  .route("/")
  .post(validateBody(createPaymentSchema), create)
  .get(getAll);

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(
    validateParams(idParamSchema),
    validateBody(updatePaymentSchema),
    update
  )
  .delete(validateParams(idParamSchema), remove);

export default router;
