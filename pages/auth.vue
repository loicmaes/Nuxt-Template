<script setup lang="ts">
import PageRoot from "~/components/composing/page/PageRoot.vue";
import RegisterForm from "~/components/pages/auth/RegisterForm.vue";
import LoginForm from "~/components/pages/auth/LoginForm.vue";

const { t } = useI18n();

interface ITab {
  name: string;
  label: string;
  component: Component;
}
const tabs: ITab[] = [
  {
    name: "login",
    label: t("auth.login.title"),
    component: LoginForm,
  },
  {
    name: "register",
    label: t("auth.register.title"),
    component: RegisterForm,
  },
];
</script>

<template>
  <PageRoot
    name="auth"
    class="grid place-items-center min-h-dvh"
  >
    <Tabs
      :default-value="tabs[0].name"
      class="w-[min(100%,400px)]"
    >
      <TabsList class="w-full grid grid-cols-2">
        <TabsTrigger
          v-for="tab in tabs"
          :key="`tt-${tab.name}`"
          :value="tab.name"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="tab in tabs"
        :key="`tc-${tab.name}`"
        :value="tab.name"
      >
        <component :is="tab.component" />
      </TabsContent>
    </Tabs>
  </PageRoot>
</template>
