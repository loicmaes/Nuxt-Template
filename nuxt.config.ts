// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "nuxt-mailer",
    "nuxt-scheduler",
    "shadcn-nuxt",
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: "My Nuxt Application",
    },
  },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    mailerHost: "",
    mailerPort: "",
    mailerUser: "",
    mailerPass: "",
    mailerFromAddress: "",
    mailerFromName: "",
    mailerDefaultTo: "",
    mailerDefaultSubject: "",

    public: {
      apiUrl: "",
    },
  },
  compatibilityDate: "2024-11-01",
  eslint: {
    checker: true,
    config: {
      stylistic: {
        semi: true,
        indent: 2,
        quotes: "double",
      },
    },
  },
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["en"],
    defaultLocale: "en",
  },
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: true,
  },
});
