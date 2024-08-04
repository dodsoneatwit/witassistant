import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

// holds the selected message and it's related links
export const useSidebarStore = defineStore('sidebarState', () => {
  const relatedLinks: Ref<string[]> = ref([]);
  const selectedMessage: Ref<Message | undefined> = ref(undefined);

  const visible = ref(true);

  function selectMessage(message: Message) {
    selectedMessage.value = message;
    relatedLinks.value = message.relatedLinks || [];

  }

  function hide() {
    visible.value = false;
  }

  return { relatedLinks, selectedMessage, visible, selectMessage, hide }
});