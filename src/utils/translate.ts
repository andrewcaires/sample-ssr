import { Translate } from "@andrewcaires/translate";
import { type App } from "vue";

import en from "../locales/en";
import pt from "../locales/pt";

Translate.options({

  locale: "pt",
  locales: { en, pt },

});

export const install = (app: App) => {

  app.config.globalProperties.$t = Translate.to;
};

export const translate = Translate.to;

export default install;

declare module "@vue/runtime-core" {

  interface ComponentCustomProperties {

    $t: typeof translate;
  }
}
