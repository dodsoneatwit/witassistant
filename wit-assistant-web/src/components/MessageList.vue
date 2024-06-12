<script setup lang="ts">
import ChatMessage from './ChatMessage.vue';
import { useMessageStore } from '@/stores/messages';

// defineProps({
//   messages: {
//     type: Array as PropType<Message[]>,
//     default() {
//       return [{text: '', sender: 'assistant'}]
//     }
//   }
// })
let mStore = useMessageStore();
</script>
<template>
  <li v-for="(mes, index) in mStore.messages" :key="index">
    <ChatMessage :message-text="mes.text" :sender="mes.sender" />
  </li>
</template>
<style>
li {
  display: block;
  margin-bottom: 10px;  
}
</style>