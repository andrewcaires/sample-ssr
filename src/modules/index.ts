import { type App } from "vue";

import cookie from "./cookie";
import fetch from "./fetch";
import head from "./head";
import pinia from "./pinia";
import router from "./router";
import translate from "./translate";
import ui from "./ui";

const modules = [cookie, fetch, head, pinia, router, translate, ui];

export const install = (app: App): void => modules.forEach((value) => app.use(value));

export * from "./cookie";
export * from "./fetch";
export * from "./head";
export * from "./pinia";
export * from "./router";
export * from "./translate";

export default install;
