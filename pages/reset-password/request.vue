<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft, Send, SystemRestart } from "@iconoir/vue";
import * as z from "zod";
import { useForm } from "vee-validate";
import PageRoot from "~/components/composing/page/PageRoot.vue";

const { t } = useI18n();
useHead({
  title: `${t("platformLabel")} ${t("auth.resetPassword.request.title")}`,
});

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  email: z.string().email(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const canMove = await sendPasswordRequest(t, values.email);

  loading.value = false;
  if (canMove)
    await navigateTo(useLocalePath()("/auth"));
});
</script>

<template>
  <PageRoot
    name="requestResetPassword"
    class="grid place-items-center min-h-dvh"
  >
    <div class="flex flex-col w-[min(100%,400px)] gap-2">
      <Button
        variant="ghost"
        size="icon"
        as-child
      >
        <NuxtLinkLocale to="/auth">
          <ArrowLeft />
        </NuxtLinkLocale>
      </Button>

      <Card>
        <CardHeader class="border-b border-b-border">
          <CardTitle>{{ t("auth.resetPassword.request.title") }}</CardTitle>
          <CardDescription>{{ t("auth.resetPassword.request.description") }}</CardDescription>
        </CardHeader>
        <form @submit="onSubmit">
          <CardContent class="pt-4 flex flex-col gap-4">
            <FormField
              v-slot="{ componentField }"
              name="email"
            >
              <FormItem>
                <FormLabel>{{ t("auth.resetPassword.request.form.fields.email") }}</FormLabel>
                <FormControl v-bind="componentField">
                  <Input placeholder="john.doe@example.xyz" />
                </FormControl>
              </FormItem>
            </FormField>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              class="w-full"
              :disabled="loading"
            >
              <template v-if="loading">
                <SystemRestart class="animate-spin" />
                <span>{{ t("auth.resetPassword.request.form.action.loading") }}</span>
              </template>
              <template v-else>
                <Send />
                <span>{{ t("auth.resetPassword.request.form.action.idle") }}</span>
              </template>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  </PageRoot>
</template>
