import { Fetch } from "@andrewcaires/fetch";
import { type App } from "vue";

import { API_URL } from "@/utils";

export const fetch = new Fetch({

  url: API_URL,
  timeout: 20000,

});

export const install = (app: App): void => {

  app.config.globalProperties.$fetch = fetch;
};

export default install;

declare module "@vue/runtime-core" {

  export interface ComponentCustomProperties {

    $fetch: Fetch;
  }
}
