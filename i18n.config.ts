import en from "~/assets/i18n/en";
import fr from "~/assets/i18n/fr";
import de from "~/assets/i18n/de";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    fr,
    de,
  },
}));
