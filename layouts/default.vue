<script setup lang="ts">
import LayoutRoot from "~/components/composing/layout/LayoutRoot.vue";
import UiSettingsGroup from "~/components/frontSettings/UiSettingsGroup.vue";
</script>

<template>
  <LayoutRoot
    name="default"
    container
  >
    <slot />
    <UiSettingsGroup />
  </LayoutRoot>
</template>
