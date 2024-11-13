import { type App } from "vue";

import HelloWorld from "./HelloWorld.vue";

export const install = (app: App) => {

  app.component("HelloWorld", HelloWorld);
};

declare module "vue" {

  export interface GlobalComponents {

    HelloWorld: typeof HelloWorld,

  }
}

export default install;
