import { type App } from "vue";

import cookie from "./cookie";
import fetch from "./fetch";
import translate from "./translate";
import ui from "./ui";

export const install = (app: App): void => [

  cookie,
  fetch,
  translate,
  ui,

].forEach((value) => app.use(value));

export * from "./cookie";
export * from "./fetch";
export * from "./ssr";
export * from "./translate";

export default install;
