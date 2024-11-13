import { type App } from "vue";
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";

import { routes } from "@/routes";
import { BASE_URL, SSR } from "@/utils";

export const router = createRouter({

  history: SSR ? createMemoryHistory(BASE_URL) : createWebHistory(BASE_URL),
  routes,

});

export const install = (app: App): void => {

  app.use(router);
};

export default install;
