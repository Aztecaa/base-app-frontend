import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

const routes = [
    { path: '/', component: () => import('../views/Home.vue'), meta: { requiresAuth: true, roles: ['cajero', 'supervisor'] }  },
    { path: '/login', component: () => import('../views/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.meta.requiresAuth && !userStore.user) return next('/login')
    if (to.path === '/login' && userStore.user) return next('/dashboard')

    if (to.meta.roles && !to.meta.roles.includes(userStore.role)) return next('/dashboard')

    next()
})

export default router
