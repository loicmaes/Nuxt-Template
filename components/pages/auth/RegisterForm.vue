<script setup lang="ts">
import { Rocket, SystemRestart } from "@iconoir/vue";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const { t } = useI18n();
useHead({
  title: `${t("platformLabel")} ${t("auth.register.title")}`,
});

const loading = ref<boolean>(false);
const showPassword = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  username: z.string().regex(/^[A-Za-z0-9_\-.]{8,24}$/),
  password: z.string().regex(/^[A-Za-z0-9_\-.]{12,32}$/),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const canMove = await registerUser(t, values);

  loading.value = false;
  if (canMove)
    await navigateTo(useLocalePath()("/"));
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t("auth.register.title") }}</CardTitle>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="flex flex-col gap-4">
        <FormField
          v-slot="{ componentField }"
          name="username"
        >
          <FormItem>
            <FormLabel>{{ t("auth.register.form.fields.username") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="john.doe" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>{{ t("auth.register.form.fields.password") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                :type="showPassword ? 'text' : 'password'"
                placeholder="··········"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="flex items-start gap-3">
          <Checkbox
            id="showPassword"
            :checked="showPassword"
            @update:checked="showPassword = $event"
          />
          <Label for="showPassword">{{ t("auth.register.form.fields.showPassword") }}</Label>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col gap-3">
        <span class="text-sm text-muted-foreground">{{ t("auth.register.form.fields.conditions") }}</span>
        <Button
          type="submit"
          class="w-full"
          :disabled="loading"
        >
          <template v-if="loading">
            <SystemRestart class="animate-spin" />
            <span>{{ t("auth.register.form.action.loading") }}</span>
          </template>
          <template v-else>
            <Rocket />
            <span>{{ t("auth.register.form.action.idle") }}</span>
          </template>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
