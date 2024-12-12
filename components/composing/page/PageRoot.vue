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
  <main
    :data-page="props.name"
    :class="cn('', props.class)"
  >
    <slot />
  </main>
</template>
