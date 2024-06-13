<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  }
});

</script>

<template>
  <div class="chat-message">
    <div class="message-box" :class="{
      sent: message.sender === 'self',
      recieved: message.sender !== 'self'
    }">
      {{ message.text }}
    </div>
  </div>
</template>

<style>
.chat-message {
  display: flex;
}
.message-box {
  border-radius: 6px;
  padding: 10px;
  max-width: 90%;
}

.message-box.sent {
  color: white;
  background-color: #4e8cff;
  margin-left: auto;
}

.message-box.recieved {
  color: #263238;
  background-color: #f4f7f9;
}
</style>