<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface LayoutProps {
  name: string;
  container?: boolean;
  class?: HTMLAttributes["class"];
}
const props = defineProps<LayoutProps>();
</script>

<template>
  <div
    :data-layout="props.name"
    :class="cn(props.container ? 'container' : '', '', props.class)"
  >
    <slot />
  </div>
</template>
