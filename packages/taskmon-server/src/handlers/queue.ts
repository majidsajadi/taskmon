import { Response, Request, NextFunction } from "express";
import HttpStatusCode from "../utils/http-codes";

export const getQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.provider
    const queues = provider.getQueues();

    res.status(HttpStatusCode.OK).send({
      queues
    });
  } catch (error) {
    next(error);
  }
};
