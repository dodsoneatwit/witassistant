import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useSidebarStore } from './sidebarState';

export const useMessageStore = defineStore('message', () => {
  const sidebarState = useSidebarStore();

  // set the initial message, to use during 
  const messages: Ref<Message[]> = ref([{
    text: 'Welcome to the WISE (Wentworth Intelligent Support Entity)! What can I help you with?',
    sender: 'assistant-initial'
  }]);
  // set while waiting for a response from the API
  const loading: Ref<boolean> = ref(false);


  const latest = computed(() => messages.value[messages.value.length - 1]);

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
    // switch to http://127.0.0.1:5000/api/q&a if localhost not responding
    const url = import.meta.env.VITE_API_ENDPOINT + '/q&a';
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

  // take response, load it into messages, then select message for related links if it has any
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
