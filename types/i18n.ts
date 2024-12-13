import type { ComposerTranslation, DefineLocaleMessage } from "vue-i18n";
import type { RemoveIndexSignature } from "@intlify/core-base";

export type InternationalizationTool = ComposerTranslation<RemoveIndexSignature<{ [p: string]: DefineLocaleMessage[string] }>>;
