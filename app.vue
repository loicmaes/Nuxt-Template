<script setup lang="ts">
import { IconoirProvider } from "@iconoir/vue";

const { t } = useI18n();

await getWhoAmI(t);

const iconProps = {
  "width": "1.1rem",
  "height": "1.1rem",
  "stroke-width": "2",
};
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <Toaster />

    <IconoirProvider :icon-props="iconProps">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </IconoirProvider>
  </div>
</template>
