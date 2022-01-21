import HttpStatusCode from "../utils/http-codes";

export class AppError extends Error {
  public statusCode?: HttpStatusCode;
  public constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
