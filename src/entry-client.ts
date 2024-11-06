import { createApp } from "./main";

const { app, router, store } = createApp();

const storeInitialState = (window as any).__INITIAL_STATE__ ?? {};

if (storeInitialState) {

  store.state.value = JSON.parse(JSON.stringify(storeInitialState)) ?? {};
}

router.isReady().then(() => app.mount("#app"));
