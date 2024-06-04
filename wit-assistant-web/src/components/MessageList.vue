<script setup lang="ts">
import type { PropType } from 'vue';
import ChatMessage from './ChatMessage.vue';

defineProps({
  messages: {
    type: Array as PropType<Message[]>,
    default() {
      return [{text: '', sender: 'assistant'}]
    }
  }
})
</script>
<template>
  <li v-for="(mes, index) in messages" :key="index">
    <ChatMessage :message-text="mes.text" />
  </li>
</template>
<style></style>