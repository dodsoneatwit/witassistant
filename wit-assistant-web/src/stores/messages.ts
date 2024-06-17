import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const messages: Ref<Message[]> = ref([{
    text: 'Welcome to the assistant! What can I help you with?',
    sender: 'assistant'
  }]);

  // const doubleCount = computed(() => count.value * 2)
  const latest = computed(() => messages.value);

  function pushMessage(message: Message) {
    messages.value.push(message);
  }

  async function askQuestion(text: string) {
    pushMessage({
      text,
      sender: 'self'
    });

    // get ai response
    // console.log(import.meta.env.VITE_API_ENDPOINT)
    const url = import.meta.env.VITE_API_ENDPOINT + '/q&a';
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    };
    const answer = await fetch(url, fetchOptions).then(resp => resp.json());
    response(answer.response);
  }

  function response(text: string) {
    pushMessage({
      text,
      sender: 'assistant'
    })
  }

  return { messages, latest, pushMessage, askQuestion, response }
})
