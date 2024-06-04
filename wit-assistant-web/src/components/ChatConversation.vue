<script setup lang="ts">
import MessageList from './MessageList.vue';
import MessageEditor from './MessageEditor.vue';
import { ref, type Ref } from 'vue';

const messages: Ref<Message[]> = ref([{text: 'Welcome to the assistant! What can I help you with?', sender: 'assistant'}]);

function onMessage(text: string) {
  messages.value.push({
    text,
    sender: 'self'
  });

  // TODO: Send question to server, and get response
}
</script>
<template>
  <div>wow</div>
  <MessageList :messages="messages"/>
  <MessageEditor @message="onMessage" />
</template>