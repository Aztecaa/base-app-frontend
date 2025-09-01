<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/user.js'

const userStore = useUserStore()

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-dark'])

const menuOpen = ref(false)
</script>

<template>
  <nav class="flex justify-between items-center w-full fixed top-0 p-4 bg-white dark:bg-gray-900 shadow-md z-50">
    <div class="flex items-center gap-4">
      <router-link to="/" class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">Inicio</router-link>
      <router-link v-if="userStore.isLogged" to="/dashboard"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">Dashboard</router-link>
      <router-link v-if="userStore.isLogged" :to="userStore.role === 'supervisor' ? '/users' : '#'"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        :class="{ 'opacity-50 cursor-not-allowed': userStore.role !== 'supervisor' }">Usuarios</router-link>
      <router-link v-if="userStore.isLogged" :to="userStore.role === 'supervisor' ? '/panel' : '#'"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        :class="{ 'opacity-50 cursor-not-allowed': userStore.role !== 'supervisor' }">Panel</router-link>
      <router-link v-if="userStore.isLogged" to="/ventas"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">Ventas</router-link>
    </div>

    <div class="ml-auto flex gap-4 items-center">
      <router-link v-if="!userStore.isLogged" to="/login"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">Login</router-link>

      <div v-else class="flex gap-2 items-center">
        <span v-if="userStore.role === 'supervisor'">🖥️</span>
        <span v-if="userStore.role === 'cajero'">📦</span>
        <span class="text-gray-900 dark:text-gray-100">{{ userStore.user.username }} ({{ userStore.role }})</span>
        <button @click="userStore.logout()" class="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded-lg cursor-pointer">
          Salir
        </button>
      </div>

      <!-- <div class="relative">
        <button @click="menuOpen = !menuOpen" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">⋮</button>
        <div v-if="menuOpen" class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow-md">
          <button @click="$emit('toggle-dark'); menuOpen = false"
            class="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
            {{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}
          </button>
        </div>
      </div> -->
    </div>
  </nav>
</template>
