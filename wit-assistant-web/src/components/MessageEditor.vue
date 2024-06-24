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
  <v-form @submit.prevent="sendMessage" class="question-box">
    <v-text-field
      type="text"
      :disabled="disabled"
      density="comfortable"
      variant="outlined"
      label="Ask WISE A Question!"
      color="white"
      v-model="text"
    >
      <template v-slot:append-inner>
        <v-btn
          @click="sendMessage"
          type="submit"
          :disabled="disabled"
          color="white"
          icon="mdi-chevron-up"
          variant="text"
        ></v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<style>
.question-box {
  display: flex;
}
</style>