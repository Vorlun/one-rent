import { Router } from "express";
import machineTypesRouter from "./machineTypes.routes.js"

const router = Router()

router.use("/machine-types", machineTypesRouter)

export default router