<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
let text = ref('');

const emit = defineEmits(['message']);

function sendMessage() {
  if (text.value.length === 0) return false;
  emit('message', text.value);

  text.value = '';
}
</script>

<template>
  <input type="text" :disabled @keyup:enter="sendMessage" v-model="text">
  <button type="submit" :disabled @click="sendMessage">Ask</button>
</template>