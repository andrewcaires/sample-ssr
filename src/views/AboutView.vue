<template>
  <div class="about-view">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useHeadStore } from "@/stores";
import { onRender } from "@/utils";

const head = useHeadStore();

const { title } = storeToRefs(head);

onRender(() => {

  title.value = "About";
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>