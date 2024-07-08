<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarState';
import ChatMessage from './ChatMessage.vue';
import ChatSidebar from './ChatSidebar.vue';
import MessageEditor from './MessageEditor.vue';
import { useMessageStore } from '@/stores/messages';

const mStore = useMessageStore();
const sideStore = useSidebarStore();

function onMessage(text: string) {
  mStore.askQuestion(text);
}

function messageClick(evt: Event, mes: Message) {
  sideStore.selectMessage(mes);
  sideStore.visible = true;
}

// TODO: Add loading message to make it clear a response is coming, and that's why the ask box is disabled
// TODO: Maybe extract message box out to make it easier to have error messages and such?
</script>

<template>
  <div class="flex-col">
    <li v-for="(mes, index) in mStore.messages" :key="index">
      <ChatMessage :message="mes" @click="messageClick($event, mes)" :selected="mes === sideStore.selectedMessage"/>
    </li>
    <div class="loader" v-if="mStore.messages.length % 2 === 0">
      <v-skeleton-loader :elevation="5" color="primary" type="text"></v-skeleton-loader>
    </div>
    <MessageEditor @message="onMessage" :disabled="mStore.loading" />
  </div>
  <ChatSidebar />
</template>

<style scoped>
.loader {
  margin-bottom: 1rem;
  margin-right: 50%
}
.flex-col {
  display: flex;
  flex-direction: column;
  width: 50rem; /* Initial width */
}

li {
  display: block;
  margin-bottom: 10px;  
}

/* Media query for medium screens */
@media (max-width: 1200px) {
  .flex-col {
    width: 40rem;
  }
}

/* Media query for small screens */
@media (max-width: 768px) {
  .flex-col {
    width: 26.5rem;
  }
}
</style>
