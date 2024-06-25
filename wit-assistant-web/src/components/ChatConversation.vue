<script setup lang="ts">
import ChatMessage from './ChatMessage.vue';
import MessageEditor from './MessageEditor.vue';
import { useMessageStore } from '@/stores/messages';

const mStore = useMessageStore();

function onMessage(text: string) {
  mStore.askQuestion(text);
}

// TODO: Add loading message to make it clear a response is coming, and that's why the ask box is disabled
// TODO: Maybe extract message box out to make it easier to have error messages and such?
</script>

<template>
  <div class="flex-col">
    <li v-for="(mes, index) in mStore.messages" :key="index">
      <ChatMessage :message="mes" />
    </li>
    <MessageEditor @message="onMessage" :disabled="mStore.loading" />
  </div>
</template>

<style scoped>
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
