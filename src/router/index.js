// 📌 Acá definís las páginas y rutas de la app

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

const routes = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/login', component: () => import('../components/Login.vue') },
    { path: '/panel', component: () => import('../views/Panel.vue'), meta: { requiresAuth: true, role: ['supervisor'] } },
    { path: '/ventas', component: () => import('../views/Ventas.vue'), meta: { requiresAuth: true, role: ['cajero', 'supervisor'] } },
    { path: '/dashboard', component: () => import('../views/Dashboard.vue'), meta: { requiresAuth: true } },
    {
        path: '/users', component: () => import('../views/Users.vue'), meta: { requiresAuth: true, role: 'supervisor' }  // 🔗 Marcamos ruta protegida 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// # Middleware de navegación
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.meta.requiresAuth && !userStore.user) {
        return next('/login')
    }

    if (to.path === '/login' && userStore.user) {
        return next('/dashboard')
    }

    // 🔹 Si la ruta tiene roles y el rol del usuario no está incluido → redirige
    if (to.meta.roles && !to.meta.roles.includes(userStore.role)) {
        return next('/dashboard')
    }

    next()
})

export default router