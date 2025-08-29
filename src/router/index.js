// 📌 Acá definís las páginas y rutas de la app

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../pages/Home.vue') }, // ruta base
    { path: '/users', component: () => import('../pages/Users.vue') } // 🔗 ejemplo conectado al backend
]

export default createRouter({
    history: createWebHistory(),
    routes
})