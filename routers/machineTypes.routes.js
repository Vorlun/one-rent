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
import authGuard from "../middlewares/guards/auth.guard.js";
import requiredRoles from "../middlewares/guards/role.guard.js"

const router = Router();

router
  .route("/")
  .post(
    validateBody(createMachineTypeSchema),
    authGuard,
    requiredRoles(["admin"]),
    create
  ).get(authGuard,requiredRoles(["admin"]), (getAll));

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
