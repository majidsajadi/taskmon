import express, { Response, Request, NextFunction, Router } from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { AppError } from "./types";
import { createProvider } from "./providers";
import HttpStatusCode from "./utils/http-codes";

import * as queueHandler from "./handlers/queue";
import * as jobHandler from "./handlers/job";

const app = express();

app.set("port", process.env.PORT || 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("short"));
app.use(compression());

app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: read connection fro env
    const provider = createProvider("bullMQ", {
      connection: {
        port: 6379,
        host: "127.0.0.1",
        password: "auth",
      },
    });

    req.provider = provider;
    next();
  } catch (error) {
    next(
      new AppError("Connection error", HttpStatusCode.INTERNAL_SERVER_ERROR)
    );
  }
});

const router = Router();

router.get("/queues", queueHandler.getQueue);
router.get("/queues/:queue/jobs", jobHandler.getJobs);

app.use("/api/v1", router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal error occurred." });
});

export default app;
