import "dotenv/config";

import express, { type Request, type Response, type NextFunction } from "express";
import bodyParser from "body-parser";
import dataSource from "./configs/dataSource";
import { routes as apiRoutes } from "./routes/index";

const app = express();

void dataSource.initialize();

app.set("port", process.env.PORT ?? 3052);

app.use(bodyParser.json());

app.use(
  (
    error: unknown,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    response.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
);

app.use("/api", apiRoutes);

export default app;
