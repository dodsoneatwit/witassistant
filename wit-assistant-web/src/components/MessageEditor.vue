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
  <form @submit.prevent="sendMessage" class="question-box">
    <input type="text" :disabled v-model="text">
    <button type="submit" :disabled >Ask</button>
  </form>
</template>

<style>
.question-box {
  display: flex;
}
</style>