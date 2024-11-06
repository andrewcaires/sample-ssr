<template>
  <router-view class="intro-x" v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>