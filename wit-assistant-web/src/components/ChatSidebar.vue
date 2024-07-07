<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarState'; 
const state = useSidebarStore()

console.log(state)
</script>

<template>
  <aside>
    <h3>Related Links</h3>
    <ul v-if="state.relatedLinks.length > 0">
      <li v-for="link in state.relatedLinks" :key="link">
        <a :href="link">{{ link }}</a>
      </li>
    </ul>
    <div v-else>
      There are no related links for this message.
    </div>
  </aside>
</template>

<style scoped>
aside {
  position: fixed;
  height: 100%;
  z-index: 1;
  top: 10rem;
  right: 0;
  width: 17%;
}
</style>