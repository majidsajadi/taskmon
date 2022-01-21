import { Response, Request, NextFunction } from "express";
import HttpStatusCode from "../utils/http-codes";

export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.provider;
    const { queue } = req.params;
    const { type } = req.query;
    const { page, pageSize } = req.query;

    const jobs = provider.getJobs(queue, type, {
      page,
      pageSize,
    });

    res.status(HttpStatusCode.OK).send({
      jobs,
    });
  } catch (error) {
    next(error);
  }
};
