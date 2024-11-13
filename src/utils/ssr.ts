import { onMounted, onServerPrefetch } from "vue";

export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const onRender = isClient ? onMounted : onServerPrefetch;
