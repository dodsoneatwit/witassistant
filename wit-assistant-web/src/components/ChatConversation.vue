<script setup lang="ts">
import MessageList from './MessageList.vue';
import MessageEditor from './MessageEditor.vue';
import { useMessageStore } from '@/stores/messages';

const messages = useMessageStore();

function onMessage(text: string) {
  messages.askQuestion(text);

  // TODO: Send question to server, and get response
}
</script>

<template>
  <div class="flex-col">
    <MessageList/>
    <MessageEditor @message="onMessage" />
  </div>
</template>

<style>
.flex-col {
  display: flex;
  flex-direction: column;
}
</style>