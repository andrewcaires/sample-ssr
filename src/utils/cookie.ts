import { Cookie } from "@andrewcaires/cookie";
import { type App } from "vue";

Cookie.options({

  expires: 7 * 86400,

});

export const install = (app: App) => {

  app.config.globalProperties.$cookie = Cookie;
};

export { Cookie };

export default install;

declare module "@vue/runtime-core" {

  interface ComponentCustomProperties {

    $cookie: Cookie;
  }
}
