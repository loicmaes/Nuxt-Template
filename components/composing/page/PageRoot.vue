<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface PageProps {
  name: string;
  class?: HTMLAttributes["class"];
}
const props = defineProps<PageProps>();
</script>

<template>
  <div
    :data-page="props.name"
    :class="cn('', props.class)"
  >
    <slot />
  </div>
</template>
