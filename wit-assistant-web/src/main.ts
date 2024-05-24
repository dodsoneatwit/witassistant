import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Chat from 'vue3-beautiful-chat'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Chat)

app.mount('#app')
