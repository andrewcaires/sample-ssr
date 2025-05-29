import { type App } from "vue";
import { createPinia } from "pinia";

import { isClient } from "@/utils";

export const install = (app: App): void => {

  const pinia = createPinia();

  if (isClient) {

    pinia.state.value = (window as any)?.__INITIAL_STATE__ ?? {};
  }

  app.use(pinia);
};

export default install;
