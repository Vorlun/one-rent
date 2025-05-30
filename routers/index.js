import { Router } from "express";
import machineTypesRouter from "./machineTypes.routes.js"
import machinesRouter from "./machines.routes.js"
import contractRouter from "./contract.routes.js"
import machineContractRouter from "./machineContract.routes.js"
import paymentRouter from "./payment.routes.js"
import userRouter from "./users.routes.js"
import authRouter from "./auth.routes.js"
import reviewRouter from "./review.routes.js"

const router = Router()

router.use("/machine-types", machineTypesRouter)
router.use("/machines", machinesRouter)
router.use("/contract", contractRouter);
router.use("/machine-contract", machineContractRouter);
router.use("/payment", paymentRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter)
router.use("/review", reviewRouter)


export default router