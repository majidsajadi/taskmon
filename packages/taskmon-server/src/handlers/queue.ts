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
    let queues = await provider.getQueuesInfo();

    queues = queues.map((queue) => {
      const totalCount = Object.values(queue.counts).reduce(
        (prev, curr) => prev + curr,
        0
      );

      return {
        ...queue,
        totalCount,
      };
    });

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
