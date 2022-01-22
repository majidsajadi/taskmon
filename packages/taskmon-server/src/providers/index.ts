import { Provider, Options } from "./base";
import BullMQ from "./bullmq";

export function createProvider(type: "bullMQ" | "bull", options: Options): Provider {
  if (type === "bullMQ") {
    return new BullMQ(options);
  }

  throw new Error("type is not valid");
}

export default Provider