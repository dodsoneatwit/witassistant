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

function processListItems(text: string) {
  let colon = /: /
  let dashes = /- /
  let commas = /,/
  let nums = /\d+\./g;
  let split = [];

  if (!colon.test(text)) {
    return text
  }

  split = text.split(":")
  let beforeList = split[0] + ": <br>" 
  let list_string = split[1];
  let items: any[] = []
  if (dashes.test(list_string)) {
    items = list_string.split(" - ").map(item => item.trim().replace(/\.$/, ''))
  } else if (commas.test(list_string)) {
    items = list_string.split(",").map(item => item.trim().replace(/\.$/, ''))
  } else if (nums.test(list_string)) {
    items = list_string.split(/\d+\./).filter(item => item.trim() !== "").map(item => item.trim());
  }

  beforeList += "<ul class='received-list'>"
  items.forEach(item => {
    let reprocessedItem = processListItems(item)
    beforeList += "<li>" + reprocessedItem + "</li>"
  })
  beforeList += "<ul>"

  return beforeList

}

function splitToParagraphs(message: string) {
  let sentences = message.split(". ");
  let limit = 5;
  let paragraphs = [];
  let paragraph = [];
  
  for (let i = 0; i < sentences.length; i++) {
    paragraph.push(sentences[i]);
    if (paragraph.length === limit) {
      paragraphs.push(paragraph.join(". ") + ".");
      paragraph = [];
    }
  }
  // Join paragraphs with <p> tags
  let essay = paragraphs.map(p => `<p>${p}</p><br>`).join("")
  // Add any remaining sentences as the last paragraph
  if (paragraph.length > 0) {
    essay += paragraph.join(". ");
  }
  
  return essay;
}

</script>

<template>
  <div class="chat-message">
    <div class="message-box" :class="{
      sent: message.sender === 'self',
      recieved: message.sender !== 'self',
      selected,
    }">
      <div v-if="message.sender === 'assistant'" v-html="splitToParagraphs(message.text)"></div>
      <div v-else>{{ message.text }}</div>
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
  background-color: rgb(255, 255, 255);
  font-weight: 500;
  margin-left: auto;
  font-size: 1.5rem;
  font-family: "Dosis", sans-serif;
  font-style: normal;
  font-optical-sizing: auto;
  font-style: normal;
  padding: 1rem;
  border: 2px solid rgb(190, 118, 242);
  box-shadow: 0px 0px 5px rgb(190, 118, 242);
  border-radius: 2rem;
}

.message-box.sent:hover {
  box-shadow: 0px 0px 30px rgb(190, 118, 242);
  transition-duration: 1s;
  cursor: pointer;
}

.message-box.recieved {
  color: #ffffff;
  background-color: #283593;
  border: 2px solid rgb(246, 244, 244);
  box-shadow: 0px 0px 5px rgb(243, 242, 240);
  background-image: linear-gradient( to bottom right, #562ab6 15%, #283593 90%);
  font-size: 1.5rem;
  font-family: "Dosis", sans-serif;
  font-style: normal;
  font-optical-sizing: auto;
  font-style: normal;
  transition-duration: 1s;
  padding: 1rem;
  border-radius: 2rem;
}

.message-box.recieved:hover {
  box-shadow: 0px 0px 30px rgb(243, 240, 240);
  transition-duration: 1s;
  cursor: pointer;
}

.message-box.recieved.selected {
  background-color: #656fbc;
  transition-duration: 1s;
  box-shadow: 0px 0px 30px rgb(190, 118, 242);
  background-image: linear-gradient( to bottom right, #562ab6 15%, #283593 90%);
}

.received-list {
  margin-left: 3rem;
  list-style:decimal !important;
}
</style>