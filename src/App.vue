<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route?.matched[0]?.name || 'none'" />
  </router-view>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch, ref } from 'vue';

import { useDateTimeStore } from './stores';

const datetime = useDateTimeStore();

const test = ref(0);

onServerPrefetch(() => {

  datetime.now();
});

onMounted(() => {

  datetime.now();
});
</script>

<style lang="scss" scoped></style>