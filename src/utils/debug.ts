import { MODE } from "./env";

export const debug = (...args: Array<any>) => MODE == "development" && console.log(...args);
