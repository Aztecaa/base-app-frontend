<script setup>
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user, role } = storeToRefs(userStore) // 🔹 Refs reactivas
</script>

<template>
    <nav class="flex gap-4 p-4 bg-gray-800 text-white">
        <router-link to="/">Inicio</router-link>
        
        <router-link v-if="user" to="/dashboard">Dashboard</router-link>

        <router-link v-if="user" :to="role === 'supervisor' ? '/users' : '#'"
            :class="{ 'opacity-50 cursor-not-allowed': role !== 'supervisor' }">Usuarios
        </router-link>
        <router-link v-if="user" :to="role === 'supervisor' ? '/panel' : '#'"
            :class="{ 'opacity-50 cursor-not-allowed': role !== 'supervisor' }">Panel
        </router-link>
        <router-link v-if="user" to="/ventas">Ventas

        </router-link>


        <div class="ml-auto flex gap-4">
            <router-link v-if="!user" to="/login">Login</router-link>

            <div v-else class="flex gap-2 items-center">
                <span>👤 {{ user.username }} ({{ role }})</span>
                <button @click="userStore.logout()">Salir</button>
            </div>
        </div>
    </nav>
</template>