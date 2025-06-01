import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
  getCancelledContractsInRange,
} from "../controllers/contract.controller.js";

import {
  createContractSchema,
  updateContractSchema,
} from "../validations/contract.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

import authGuard from "../middlewares/guards/auth.guard.js";
import requiredRoles from "../middlewares/guards/role.guard.js";

const router = Router();

router
  .route("/")
  .post(
    authGuard,
    requiredRoles(["admin", "manager"]),
    validateBody(createContractSchema),
    create
  )
  .get(authGuard, requiredRoles(["admin", "manager"]), getAll);
router.route("/cancelled").get(authGuard, requiredRoles(["admin", "manager"]), getCancelledContractsInRange);

router
  .route("/:id")
  .get(authGuard, validateParams(idParamSchema), getOne)
  .put(
    authGuard,
    requiredRoles(["admin", "manager"]),
    validateParams(idParamSchema),
    validateBody(updateContractSchema),
    update
  )
  .delete(
    authGuard,
    requiredRoles(["admin"]),
    validateParams(idParamSchema),
    remove
  );

export default router;
