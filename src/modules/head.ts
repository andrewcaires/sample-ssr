import { type App } from "vue";
import { createHead as createHeadClient } from "@unhead/vue/client";
import { createHead as createHeadServer } from "@unhead/vue/server";

import { SSR } from "@/utils";

export const head = SSR ? createHeadServer() : createHeadClient();

export const install = (app: App): void => {

  app.use(head);
};

export default install;
