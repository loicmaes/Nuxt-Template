<script setup lang="ts">
import { SystemRestart, WarningCircle } from "@iconoir/vue";
import PageRoot from "~/components/composing/page/PageRoot.vue";

const { params } = useRoute();
const { user: userUid, session: sessionUid } = params;

const { t } = useI18n();
useHead({
  title: `${t("platformLabel")} ${t("auth.verify.title")}`,
});

const { status } = useFetch("/api/user/verify", {
  method: "POST",
  body: {
    userUid,
    sessionUid,
  },
});
watch(status, async (value) => {
  if (value !== "success")
    return;

  toasterSuccess(useToastBody(t, "auth.verify.toasts.success"));
  await navigateTo("/auth");
});
</script>

<template>
  <PageRoot
    name="accountVerification"
    class="grid place-items-center min-h-dvh"
  >
    <Alert
      v-if="status === 'pending'"
      class="w-max"
    >
      <SystemRestart class="animate-spin" />
      <AlertTitle>{{ t("auth.verify.status.pending.title") }}</AlertTitle>
      <AlertDescription>{{ t("auth.verify.status.pending.description") }}</AlertDescription>
    </Alert>
    <Alert
      v-if="status === 'error'"
      variant="destructive"
      class="w-max"
    >
      <WarningCircle />
      <AlertTitle>{{ t("auth.verify.status.error.title") }}</AlertTitle>
      <AlertDescription>{{ t("auth.verify.status.error.description") }}</AlertDescription>
    </Alert>
  </PageRoot>
</template>
