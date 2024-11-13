import { Translate } from "@andrewcaires/translate";
import { type App } from "vue";

import en from "@/locales/en";
import ptBr from "@/locales/pt-br";
import { APP_LANG } from "@/utils";

Translate.options({

  locale: APP_LANG,
  locales: { en, "pt-br": ptBr },

});

export const install = (app: App) => {

  app.config.globalProperties.$t = Translate.to;
};

export const translate = Translate.to;

export default install;

declare module "@vue/runtime-core" {

  export interface ComponentCustomProperties {

    $t: typeof translate;
  }
}
