<script setup lang="ts">
import PageRoot from "~/components/composing/page/PageRoot.vue";

const { t } = useI18n();
</script>

<template>
  <PageRoot name="auth">
    <div>{{ t("auth") }}</div>
  </PageRoot>
</template>
