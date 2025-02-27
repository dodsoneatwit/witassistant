<script setup lang="ts">
/**
 * Shows related links on the side for currently selected message
 */
import { useSidebarStore } from '@/stores/sidebarState'; 
const state = useSidebarStore()
console.log(state)
</script>

<template>
  <aside>
    <h2 class="raw-style">Related Links</h2>
    <ul v-if="state.relatedLinks.length > 0">
      <li v-for="link in state.relatedLinks" :key="link">
        <v-card 
        color="#283593"
        elevation="5"
        :href="link"  
        class="link"
        target="blank"
        >
          {{ link }}
        </v-card>
      </li>
    </ul>
    <div class="raw-style" v-else>
      There are no related links for this message.
    </div>
  </aside>
</template>

<style>
aside {
  position: fixed;
  height: 100%;
  z-index: 1;
  top: 10rem;
  left: 3rem;
  width: 17%;
}

.link {
  margin: .5rem;
  background-image: linear-gradient( to bottom right, #562ab6 15%, #283593 90%);
  font-family: "Dosis", sans-serif;
  font-style: normal;
  border: 2px solid rgb(246, 244, 244);
  padding: .5rem;
  border-radius: 1rem;
  transition-duration: 0.5s;
}

.link:hover {
  box-shadow: 0px 0px 30px rgb(109, 202, 225) !important;
  transition-duration: 0.5s;
  cursor: pointer;
}

.raw-style {
  font-family: "Dosis", sans-serif;
  font-style: normal;
  font-weight: 500;
}

h2 {
  color:rgb(255, 255, 255);
  font-family: "Red Hat Display", sans-serif;
}

ul {
  list-style: none;
}
</style>