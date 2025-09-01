import { createApp } from 'vue'
import App from './App.vue'

import './style.css' // <-- Muy importante

import { createPinia } from 'pinia'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
