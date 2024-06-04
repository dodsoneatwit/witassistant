<script setup lang="ts">
defineProps({
  messageText: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    default: 'self',
    validator(value: string) {
      return ['self', 'assistant'].includes(value);
    }
  }
});

</script>

<template>
  <div class="chat-message">
    <div class="message-box" :class="{
      sent: sender === 'self',
      recieved: sender !== 'self'
    }">
      {{ messageText }}
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