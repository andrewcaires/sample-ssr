<template>
  <main>
    <TheWelcome />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useHeadStore } from "@/stores";
import { onRender } from "@/utils";

import TheWelcome from "@/components/TheWelcome.vue";

const head = useHeadStore();

const { title } = storeToRefs(head);

onRender(() => {

  title.value = "Home";
});
</script>