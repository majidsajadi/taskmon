import { Response, Request, NextFunction } from "express";
import HttpStatusCode from "../utils/http-codes";

export const getWorkers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue } = req.params;

    const workers = await provider.getWorkers(queue);

    res.status(HttpStatusCode.OK).send({
      workers,
    });
  } catch (error) {
    next(error);
  }
};
