import { Router } from "express";
import machineTypesRouter from "./machineTypes.routes.js"
import machinesRouter from "./machines.routes.js"
import contractRouter from "./contract.routes.js"
import machineContractRouter from "./machine_contract.routes.js"
import paymentRouter from "./payment.routes.js"
import userRouter from "./users.routes.js"

const router = Router()

router.use("/machine-types", machineTypesRouter)
router.use("/machines", machinesRouter)
router.use("/contract", contractRouter);
router.use("/machine-contract", machineContractRouter);
router.use("/payment", paymentRouter);
router.use("/user", userRouter);


export default router