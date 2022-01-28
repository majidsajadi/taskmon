import { Response, Request, NextFunction } from "express";
import Provider from "../providers";
import HttpStatusCode from "../utils/http-codes";

export const getQueues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider as Provider;
    const queues = await provider.getQueuesInfo();

    res.status(HttpStatusCode.OK).send({
      queues
    });
  } catch (error) {
    next(error);
  }
};

export const getQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider as Provider;
    const { queue: queueName } = req.params;
    const queue = await provider.getQueueInfo(queueName);

    res.status(HttpStatusCode.OK).send({
      queue
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
