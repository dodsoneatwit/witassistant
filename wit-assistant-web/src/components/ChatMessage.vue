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
    <v-chip 
      size="x-large"
      density="comfortable"
      variant="elevated"
      :color= "message.sender === 'self' ? 'amber-accent-1' : 'indigo-darken-3'"
      class="message-box" :class="{
        sent: message.sender === 'self',
        recieved: message.sender !== 'self'
      }">
        {{ message.text }}
  </v-chip>
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
  color: white;
  background-color: #4e8cff;
  margin-left: auto;
}

.message-box.recieved {
  color: #263238;
  background-color: #f4f7f9;
}
</style>