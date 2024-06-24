import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create App
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
      },
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)

app.mount('#app')
