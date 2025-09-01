<script setup>
import { useUserStore } from '../store/user.js'
const userStore = useUserStore()
</script>

<template>
  <nav class="flex justify-between items-center w-full fixed top-0 p-4 bg-white dark:bg-gray-900 shadow-md z-50">
    <div class="flex items-center gap-4">
      <router-link class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        to="/">Inicio</router-link>
      <router-link v-if="userStore.isLogged"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        to="/dashboard">Dashboard</router-link>
      <router-link v-if="userStore.isLogged" :to="userStore.role === 'supervisor' ? '/users' : '#'"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        :class="{ 'opacity-50 cursor-not-allowed': userStore.role !== 'supervisor' }">Usuarios</router-link>
      <router-link v-if="userStore.isLogged" :to="userStore.role === 'supervisor' ? '/panel' : '#'"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        :class="{ 'opacity-50 cursor-not-allowed': userStore.role !== 'supervisor' }">Panel</router-link>
      <router-link v-if="userStore.isLogged"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        to="/ventas">Ventas</router-link>
    </div>
    <div class="ml-auto flex gap-4 items-center">
      <router-link v-if="!userStore.isLogged"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        to="/login">Login</router-link>
      <div v-else class="flex gap-2 items-center">
        <span v-if="userStore.role === 'supervisor'">🖥️</span>
        <span v-if="userStore.role === 'cajero'">📦</span>
        <span class="text-gray-900 dark:text-gray-100">{{ userStore.user.username }} ({{ userStore.role }})</span>
        <button class="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
          @click="userStore.logout()">Salir</button>
      </div>
    </div>
  </nav>
</template>
