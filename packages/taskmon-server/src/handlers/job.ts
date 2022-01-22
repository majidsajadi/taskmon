import { Response, Request, NextFunction } from "express";
import HttpStatusCode from "../utils/http-codes";


export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue } = req.params;
    const { page, pageSize, type } = req.query;

    const jobs = await provider.getJobs(queue, type, {
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

export const addJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue } = req.params;
    const { name, data, options } = req.body;

    await provider.addJob(queue, name, data, options);

    res.status(HttpStatusCode.CREATED);
  } catch (error) {
    next(error);
  }
};

export const removeJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue, jobId } = req.params;
    await provider.removeJob(queue, jobId);

    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};

export const retryJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue, jobId } = req.params;
    await provider.retryJob(queue, jobId);

    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};


export const promoteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = req.app.locals.provider;
    const { queue, jobId } = req.params;
    await provider.promoteJob(queue, jobId);

    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};
