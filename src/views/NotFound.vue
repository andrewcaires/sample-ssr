<template>
  <div class="not-found text-center my-5">
    <img class="w-200" alt="Vue Logo" src="@/assets/logo.svg" />

    <h1 class="text-center">Page not found</h1>

    <p class="text-center mb-5">It's look like this page doesn't exist anymore or your link is wrong...</p>

    <ui-flex justify="center">
      <ui-router-link to="/" v-slot="{ action }">
        <ui-button variant="success" @click="action">Home</ui-button>
      </ui-router-link>
    </ui-flex>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useHeadStore } from "@/stores";
import { onRender } from "@/utils";

const head = useHeadStore();

const { title } = storeToRefs(head);

onRender(() => {

  title.value = "Not Found";
});
</script>

<style lang="scss" scoped></style>