<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const { t, locale, availableLocales } = useI18n();

interface LocaleSelectorProps {
  class?: HTMLAttributes["class"];
}
const props = defineProps<LocaleSelectorProps>();

function switchLocale(loc: "en") {
  navigateTo(useSwitchLocalePath()(loc));
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger :class="cn('', props.class)">
      <Button variant="outline">
        {{ t(`globals.locales.${locale}`) }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      side="top"
    >
      <DropdownMenuRadioGroup :model-value="locale">
        <DropdownMenuRadioItem
          v-for="loc in availableLocales"
          :key="loc"
          :value="loc"
          @click="switchLocale(loc)"
        >
          {{ t(`globals.locales.${loc}`) }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
