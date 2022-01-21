declare namespace Express {
  import Provider from "./providers/base";

  export interface Request {
    provider: Provider;
  }
}