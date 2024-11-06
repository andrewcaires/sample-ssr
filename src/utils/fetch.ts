import { Fetch } from "@andrewcaires/fetch";
import { type App } from "vue";

export const fetch = new Fetch({

  url: import.meta.env.VITE_APP_URL,
  timeout: 20000,

});

export const install = (app: App) => {

  app.config.globalProperties.$fetch = fetch;
};

export default install;

declare module "@vue/runtime-core" {

  interface ComponentCustomProperties {

    $fetch: Fetch;
  }
}
