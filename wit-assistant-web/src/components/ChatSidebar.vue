<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarState'; 
const state = useSidebarStore()

console.log(state)
</script>

<template>
  <aside>
    <h3>Related Links</h3>
  </aside>
</template>

<style>
aside {
  position: fixed;
  height: 100%;
  z-index: 1;
  top: 0;
  right: 0;

}
</style>