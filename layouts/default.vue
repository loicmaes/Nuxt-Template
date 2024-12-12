<script setup lang="ts">
import LayoutRoot from "~/components/composing/layout/LayoutRoot.vue";
</script>

<template>
  <LayoutRoot
    name="default"
    container
  >
    <slot />
  </LayoutRoot>
</template>
