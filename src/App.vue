<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route?.matched[0]?.name || 'none'" />
  </router-view>
</template>

<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { storeToRefs } from "pinia";

import { useDateTimeStore, useHeadStore } from "@/stores";
import { APP_TITLE, onRender } from "@/utils";

const datetime = useDateTimeStore();
const head = useHeadStore();

const { lang, title } = storeToRefs(head);

useHead({

  title,

  htmlAttrs: { lang },

  titleTemplate: (title?: string) => `${title ? title + " - " : ""}${APP_TITLE}`,

});

onRender(() => {

  datetime.now();
});
</script>

<style lang="scss" scoped></style>