        <script setup>
        import { useUserStore } from '../store/user'
        import { storeToRefs } from 'pinia'

        const userStore = useUserStore()
        const { user, role } = storeToRefs(userStore)
</script>
        
<template>
    <nav class="flex justify-between w-full fixed top-0 p-4 bg-transparent">
        <!-- Links -->
        <div class="flex items-center gap-4">
            <router-link class="hover:text-indigo-600 dark:hover:text-indigo-400" to="/">Inicio</router-link>
            <router-link class="hover:text-indigo-600 dark:hover:text-indigo-400" v-if="user"
                to="/dashboard">Dashboard</router-link>
            <router-link class="hover:text-indigo-600 dark:hover:text-indigo-400" v-if="user"
                :to="role === 'supervisor' ? '/users' : '#'"
                :class="{ 'opacity-50 cursor-not-allowed': role !== 'supervisor' }">
                Usuarios
            </router-link>
            <router-link class="hover:text-indigo-600 dark:hover:text-indigo-400" v-if="user"
                :to="role === 'supervisor' ? '/panel' : '#'"
                :class="{ 'opacity-50 cursor-not-allowed': role !== 'supervisor' }">
                Panel
            </router-link>
            <router-link class="hover:text-indigo-600 dark:hover:text-indigo-400" v-if="user"
                to="/ventas">Ventas</router-link>
        </div>

        <!-- User Info / Login -->
        <div class="ml-auto flex gap-4 items-center">
            <router-link class="hover:text-indigo-600 dark:hover:text-indigo-400" v-if="!user"
                to="/login">Login</router-link>
            <div v-else class="flex gap-2 items-center">
                <span v-if="role === 'supervisor'">🖥️</span>
                <span v-if="role === 'cajero'">📦</span>
                <span>{{ user.username }} ({{ role }})</span>
                <button class="bg-red-700 hover:bg-red-600 text-white cursor-pointer px-2 py-1 rounded-lg"
                    @click="userStore.logout()">
                    Salir
                </button>
            </div>
        </div>
    </nav>
</template>

