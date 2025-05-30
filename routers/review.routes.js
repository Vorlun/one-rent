import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/review.controller.js";

import {
  createReviewSchema,
  updateReviewSchema,
} from "../validations/review.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

const router = Router();

router.route("/").post(validateBody(createReviewSchema), create).get(getAll);

router
  .route("/:id")
  .get(validateParams(idParamSchema), getOne)
  .put(validateParams(idParamSchema), validateBody(updateReviewSchema), update)
  .delete(validateParams(idParamSchema), remove);

export default router;
