// 📌 Monta la app, router y estado global

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)   // 🔗 Conecta Vue Router (navegación)
app.use(createPinia()) // 🔗 Conecta Pinia (estado global)
app.mount('#app')