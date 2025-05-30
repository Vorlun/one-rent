import { Router } from "express";
import { getOne, remove, update } from "../controllers/machineContract.controller.js";
const router = Router()

router.get("/:machine_id/:contract_id", getOne);
router.put("/:machine_id/:contract_id", update);
router.delete("/:machine_id/:contract_id", remove);

export default router