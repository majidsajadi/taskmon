import { Response, Request, NextFunction } from "express";
import HttpStatusCode from "../utils/http-codes";

export const getQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const queues = await provider.getQueues();

    res.status(HttpStatusCode.OK).send({
      queues
    });
  } catch (error) {
    next(error);
  }
};

export const destroyQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue } = req.params;
    await provider.destroyQueue(queue);

    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};

export const pauseQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue } = req.params;
    await provider.pauseQueue(queue);

    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};
