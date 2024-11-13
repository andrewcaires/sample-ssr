import { type App } from "vue";
import { createHead, createServerHead } from "@unhead/vue";

import { SSR } from "@/utils";

export const head = SSR ? createServerHead() : createHead();

export const install = (app: App): void => {

  app.use(head);
};

export default install;
