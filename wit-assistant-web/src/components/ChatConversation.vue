<script setup lang="ts">
import ChatMessage from './ChatMessage.vue';
import MessageEditor from './MessageEditor.vue';
import { useMessageStore } from '@/stores/messages';

const mStore = useMessageStore();

function onMessage(text: string) {
  mStore.askQuestion(text);
}
</script>

<template>
  <div class="flex-col">
    <li v-for="(mes, index) in mStore.messages" :key="index">
      <ChatMessage :message="mes" />
    </li>
    <MessageEditor @message="onMessage" />
  </div>
</template>

<style>
.flex-col {
  display: flex;
  flex-direction: column;
}

li {
  display: block;
  margin-bottom: 10px;  
}
</style>