import "./assets/main.scss";

import { createPinia } from "pinia";
import { createApp as _createApp, createSSRApp, type App as _App } from "vue";

import utils from "./utils";

import App from "./App.vue";
import { createRouter } from "./router";

import components from "./components";

export const createApp = () => {

  let app: _App;

  if (import.meta.env.DEV && !import.meta.env.SSR) {

    app = _createApp(App);

  } else {

    app = createSSRApp(App);
  }

  app.use(utils);

  const router = createRouter();

  const store = createPinia();
  app.use(store);

  app.use(router);

  app.use(components);

  return { app, router, store };
};
