import { Translate } from "@andrewcaires/translate";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { APP_LANG } from "@/utils";

export const useHeadStore = defineStore("head", () => {

  const lang = ref(APP_LANG);
  const title = ref("");

  watch(lang, () => {

    Translate.setLocale(lang.value);
  });

  return { lang, title };
});
