import { defineStore } from "pinia";
import type { DocumentList } from "@/types/DocumentList";

export const useCurrentItemStore = defineStore("currentItem", {
  state: () => ({
    currentItem: null as DocumentList | null,
  }),

  actions: {
    getCurrentItem(): DocumentList | null {
      return this.currentItem;
    },

    setCurrentItem(currentItem: DocumentList) {
      this.currentItem = currentItem;
    },

    clearCurrentItem() {
      this.currentItem = null;
    },
  },
});
