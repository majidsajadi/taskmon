import express, { Response, Request, NextFunction, Router } from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { AppError } from "./types";
import { createProvider } from "./providers";

import * as queueHandler from "./handlers/queue";
import * as jobHandler from "./handlers/job";
import * as workerHandler from "./handlers/worker";

const app = express();

app.set("port", process.env.PORT || 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("short"));
app.use(compression());

// TODO: read connection fro env
const provider = createProvider("bullMQ", {
  connection: {
    port: 6379,
    host: "127.0.0.1",
  },
  prefix: "bull",
});

app.locals.provider = provider;

const router = Router();

router.get("/queues", queueHandler.getQueue);
router.delete("/queues/:queue", queueHandler.destroyQueue);
router.get("/queues/:queue/jobs", jobHandler.getJobs);
router.get("/queues/:queue/jobs/:jobId", jobHandler.removeJob);
router.get("/queues/:queue/jobs/:jobId/promote", jobHandler.promoteJob);
router.get("/queues/:queue/workers", workerHandler.getWorkers);

app.use("/api/v1", router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error instanceof AppError) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal error occurred." });
});

export default app;
