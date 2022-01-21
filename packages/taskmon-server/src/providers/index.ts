import { Provider, Options } from "./base";
import BullProvider from "./bull";
import BullMQ from "./bullmq";

export function createProvider(type: "bullMQ" | "bull", options: Options): Provider {
  if (type === "bullMQ") {
    return new BullMQ(options);
  } else if (type === "bull") {
    return new BullProvider(options);
  }

  throw new Error("type is not valid");
}

export default Provider