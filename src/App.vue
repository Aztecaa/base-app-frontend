<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import ButtonToggleTheme from './components/ButtonToggleTheme.vue'

const darkMode = ref(false)

const toggleDark = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
    <NavBar />
    <main class="p-4 pt-20">
      <router-view />
    </main>
    <ButtonToggleTheme :isDark="darkMode" @toggle="toggleDark" />
  </div>
</template>
