import { defineStore } from "pinia";
import { ref } from "vue";

export const useDateTimeStore = defineStore("datetime", () => {

  const date = ref("");

  const now = () => {

    date.value = (new Date).toLocaleString();
  };

  return { date, now };
});
