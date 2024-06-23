<script setup lang="ts">
import ChatConversation from './components/ChatConversation.vue';

</script>

<template>
  <main>
    <!-- <v-toolbar class="title" color='indigo-darken-4' dark>
      <v-row>
        <v-col cols="2">
        </v-col>
        <v-col class="">
          <v-toolbar-title class="text-center mt-3">
            <span class="title anta-regular">WISE</span>
          </v-toolbar-title>
        </v-col>
      </v-row>
    </v-toolbar> -->
    <ChatConversation />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.title {
  font-size: 2.5rem;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
</style>
