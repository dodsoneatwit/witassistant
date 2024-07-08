<script setup lang="ts">
import type { PropType } from 'vue'
defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="chat-message">
    <div class="message-box" :class="{
      sent: message.sender === 'self',
      recieved: message.sender !== 'self',
      selected,
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
  max-width: 100%;
}

.message-box.sent {
  color: rgb(0, 0, 0);
  background-color: #FFE082;
  margin-left: auto;
  font-size: large;
  font-family: "Red Hat Display", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.message-box.recieved {
  color: #ffffff;
  background-color: #283593;
  font-size: large;
  font-family: "Red Hat Display", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.message-box.recieved.selected {
  background-color: #656fbc;
}
</style>