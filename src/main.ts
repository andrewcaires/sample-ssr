import { createApp as _createApp, createSSRApp, type App as _App } from "vue";

import App from "@/App.vue";
import components from "@/components";
import modules, { head, pinia, router } from "@/modules";
import { DEV, SSR } from "@/utils";

import "./assets/main.scss";

export const createApp = () => {

  let app: _App;

  if (DEV && !SSR) {

    app = _createApp(App);

  } else {

    app = createSSRApp(App);
  }

  app.use(modules);

  app.use(components);

  return { app, head, router, pinia };
};
