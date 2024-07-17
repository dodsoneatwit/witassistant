import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useSidebarStore } from './sidebarState';

export const useMessageStore = defineStore('message', () => {
  const sidebarState = useSidebarStore();

  const messages: Ref<Message[]> = ref([{
    text: 'Welcome to the WISE (Wentworth Intelligent Support Entity)! What can I help you with?',
    sender: 'assistant-initial'
  }]);
  const loading: Ref<boolean> = ref(false);

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

    loading.value = true;

    // if calling api is disabled, return fake response
    if (import.meta.env.VITE_FAKE_API?.length || 0 > 0) {
      // wait 2 seconds
      await new Promise(r => setTimeout(r, 2000));
      // fake response with fake relatedlinks
      return response({ response: 'test response', related_links: ['https://google.com', 'https://wit.edu', 'https://github.com'] });
    }

    // get ai response
    // console.log(import.meta.env.VITE_API_ENDPOINT)
    const url = "http://127.0.0.1:5000/api/q&a";
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    };
    const answer = await fetch(url, fetchOptions).then(resp => resp.json()).catch(err => {
      loading.value = false;
      console.warn('Error querying API: ' + err);
    });
    return response(answer);
  }

  function response(answer: Answer) {
    loading.value = false;
    const mess: Message = {
      text: answer.response,
      sender: 'assistant',
      relatedLinks: answer.related_links
    };
    pushMessage(mess);

    // convenience, re-focus question field after re-enabling
    document.getElementById('question-field')?.focus()

    if (mess.relatedLinks != undefined && mess.relatedLinks.length > 0) {
      sidebarState.selectMessage(mess);
      sidebarState.visible = true;
    }
  }

  return { messages, latest, loading, pushMessage, askQuestion, response }
})
