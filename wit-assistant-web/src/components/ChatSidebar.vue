<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarState'; 
const state = useSidebarStore()

console.log(state)
</script>

<template>
  <aside>
    <h2>Related Links</h2>
    <ul v-if="state.relatedLinks.length > 0">
      <li v-for="link in state.relatedLinks" :key="link">
        <!-- <v-chip>
          <a :href="link" target="_blank">{{ link }}</a>
        </v-chip> -->
        <!-- <a :href="link" target="_blank">{{ link }}</a> -->
        <v-card 
        color="#283593"
        :variant="outlined"
        elevation="5"
        :href="link"
        class="link"
        >
          {{ link }}
        </v-card>
      </li>
    </ul>
    <div v-else>
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
  font-family: "Red Hat Display", sans-serif;
  padding: .5rem
}

h2 {
  color:rgb(255, 255, 255);
  font-family: "Red Hat Display", sans-serif;
}

ul {
  list-style-image: url('../../public/WISE_favicon.ico');
}
</style>