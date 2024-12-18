<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Send, SystemRestart } from "@iconoir/vue";
import * as z from "zod";
import { useForm } from "vee-validate";
import PageRoot from "~/components/composing/page/PageRoot.vue";

const { t } = useI18n();
useHead({
  title: `${t("platformLabel")} ${t("auth.resetPassword.newPassword.title")}`,
});

const showPasswords = ref<boolean>(false);
const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  password: z.string().regex(/^[A-Za-z0-9_\-.]{12,32}$/),
  confirm: z.string().regex(/^[A-Za-z0-9_\-.]{12,32}$/),
}).refine(val => val.password === val.confirm));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const canMove = await sendNewPassword(t, values.password);

  loading.value = false;
  if (canMove)
    await navigateTo(useLocalePath()("/auth"));
});
</script>

<template>
  <PageRoot
    name="resetPassword"
    class="grid place-items-center min-h-dvh"
  >
    <Card class="w-[min(100%,400px)]">
      <CardHeader class="border-b border-b-border">
        <CardTitle>{{ t("auth.resetPassword.newPassword.title") }}</CardTitle>
      </CardHeader>
      <form @submit="onSubmit">
        <CardContent class="pt-4 flex flex-col gap-4">
          <FormField
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem>
              <FormLabel>{{ t("auth.resetPassword.newPassword.form.fields.password") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  :type="showPasswords ? 'text' : 'password'"
                  placeholder="··········"
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="confirm"
          >
            <FormItem>
              <FormLabel>{{ t("auth.resetPassword.newPassword.form.fields.confirm") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  :type="showPasswords ? 'text' : 'password'"
                  placeholder="··········"
                />
              </FormControl>
            </FormItem>
          </FormField>
          <div class="flex gap-3 items-start">
            <Checkbox
              id="showPasswords"
              :checked="showPasswords"
              @update:checked="showPasswords = $event"
            />
            <Label for="showPasswords">{{ t("auth.resetPassword.newPassword.form.fields.showPasswords") }}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            class="w-full"
            :disabled="loading"
          >
            <template v-if="loading">
              <SystemRestart class="animate-spin" />
              <span>{{ t("auth.resetPassword.newPassword.form.action.loading") }}</span>
            </template>
            <template v-else>
              <Send />
              <span>{{ t("auth.resetPassword.newPassword.form.action.idle") }}</span>
            </template>
          </Button>
        </CardFooter>
      </form>
    </Card>
  </PageRoot>
</template>
