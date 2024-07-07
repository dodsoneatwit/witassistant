<script setup lang="ts">
import ChatConversation from './components/ChatConversation.vue';

</script>

<template>
  <v-toolbar 
        :elevation="8" 
        class="title justify-space-around" 
        color='indigo-darken-4'
        image="../public/images/pexels-ryutaro-6249821.jpg" 
        dark
      >
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col class="">
        <v-toolbar-title class="text-center mt-3">
          <span class="title anta-regular">WISE</span>
        </v-toolbar-title>
      </v-col>
    </v-row>
  </v-toolbar>
  <main>
    <div class="content">
      <ChatConversation />
    </div>
  </main>
</template>

<style scoped>
 /* header {
  line-height: 1.5;
} */

.title {
  font-size: 4rem;
  font-family: "Josefin Slab", serif;
  font-optical-sizing: auto;
  padding-top: 3rem;
  margin-bottom: 0; /* Removed margin-bottom to avoid pushing content down */
  position: fixed; /* Fixed position to stick to the top */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  width: 100%; /* Full width */
  z-index: 1000; /* Ensure it is above other content */
  height: 7rem
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

main {
  margin-top: 10rem;
}
</style>
