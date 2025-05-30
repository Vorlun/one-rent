import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
  getStats,
} from "../controllers/users.controller.js";

import {
  createUsersSchema,
  updateUsersSchema,
} from "../validations/users.validation.js";

import { validateBody, validateParams } from "../middlewares/validate.js";
import { idParamSchema } from "../validations/id_param.validation.js";

import selfGuard from "../middlewares/guards/self.guard.js";
import authGuard from "../middlewares/guards/auth.guard.js";
import requiredRoles from "../middlewares/guards/role.guard.js";

const router = Router();

router
  .route("/")
  .post(validateBody(createUsersSchema), create)
  .get(authGuard, requiredRoles(["admin"]) ,getAll);

router.get("/stats", getStats)
router
  .route("/:id")
  .get(authGuard, selfGuard, validateParams(idParamSchema), getOne)
  .put(authGuard, selfGuard,
    validateParams(idParamSchema),
    validateBody(updateUsersSchema),
    update
  )
  .delete(authGuard, selfGuard,validateParams(idParamSchema), remove);

export default router;
