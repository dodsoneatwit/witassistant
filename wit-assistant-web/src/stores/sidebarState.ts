import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useSidebarStore = defineStore('sidebarState', () => {
  const relatedLinks: Ref<string[]> = ref([]);
  const selectedMessage: Ref<Message | undefined> = ref(undefined);

  const visible = ref(false);

  function selectMessage() {

  }

  function hide() {
    visible.value = false;
  }

  return { relatedLinks, selectedMessage, visible, selectMessage, hide }
});