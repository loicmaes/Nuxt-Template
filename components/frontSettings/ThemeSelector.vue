<script setup lang="ts">
import { Laptop, SunLight, HalfMoon } from "@iconoir/vue";

const { t } = useI18n();
const colorMode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button
        size="icon"
        variant="outline"
      >
        <Laptop v-if="colorMode.preference === 'system'" />
        <SunLight v-if="colorMode.preference === 'light'" />
        <HalfMoon v-if="colorMode.preference === 'dark'" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      side="top"
    >
      <DropdownMenuRadioGroup v-model="colorMode.preference">
        <DropdownMenuRadioItem value="light">
          <SunLight />
          <span>{{ t("globals.themes.light") }}</span>
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">
          <HalfMoon />
          <span>{{ t("globals.themes.dark") }}</span>
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">
          <Laptop />
          <span>{{ t("globals.themes.system") }}</span>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
