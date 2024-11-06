import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from "vue-router";

import { translate } from "@/utils";

import routes from "./routes";

export const createRouter = () => {

  const router = _createRouter({

    history: import.meta.env.SSR ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    routes,

  });

  import.meta.env.SSR || router.beforeEach((to) => {

    const title = to.name;

    if (title) {

      document.title = translate(title.toString()) + " - " + import.meta.env.VITE_APP_TITLE;

      return true;
    }

    document.title = import.meta.env.VITE_APP_TITLE;

    return true;
  });

  return router;
};
