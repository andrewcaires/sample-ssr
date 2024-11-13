import { Cookie } from "@andrewcaires/cookie";
import { type App } from "vue";

Cookie.options({

  expires: 7 * 86400,

});

export const install = (app: App): void => {

  app.config.globalProperties.$cookie = Cookie;
};

export { Cookie };

export default install;

declare module "@vue/runtime-core" {

  export interface ComponentCustomProperties {

    $cookie: Cookie;
  }
}
