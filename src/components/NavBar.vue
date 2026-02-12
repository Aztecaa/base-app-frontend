<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.js";

const userStore = useUserStore();

defineProps({
  isDark: Boolean,
});

defineEmits(["toggle-dark"]);
</script>

<template>
  <nav
    class="flex justify-between items-center w-full fixed top-0 p-4 bg-white dark:bg-gray-900 shadow-md z-50"
  >
    <div class="flex items-center gap-4">
      <router-link
        to="/"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        >Inicio</router-link
      >
    </div>

    <div class="ml-auto flex gap-4 items-center">
      <router-link
        v-if="!userStore.isLogged"
        to="/login"
        class="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
        >Login</router-link
      >

      <div v-else class="flex gap-2 items-center">
        <span v-if="userStore.role === 'supervisor'">🖥️</span>
        <span v-if="userStore.role === 'cajero'">📦</span>
        <span class="text-gray-900 dark:text-gray-100"
          >{{ userStore.user.username }} ({{ userStore.role }})</span
        >
        <button
          @click="userStore.logout()"
          class="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded-lg cursor-pointer"
        >
          Salir
        </button>
      </div>
    </div>
  </nav>
</template>
