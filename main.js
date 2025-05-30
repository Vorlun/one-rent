import express from "express";
import config from "config";
import { errorHandler } from "./middlewares/errorHandler.js";
import mainRouter from "./routers/index.js";
import sequelize from "./config/db.js";
import cookieParser from "cookie-parser";

import {
  Users,
  Machines,
  MachineTypes,
  Contracts,
  MachinesContract,
} from "./models/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api", mainRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    type: "NotFound",
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

const PORT = config.get("port") || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); 

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Fatal error starting server:", error);
    process.exit(1);
  }
})();
