<script setup>
import Navbar from './Navbar.vue'
import ButtonToggleTheme from './ButtonToggleTheme.vue'
import { ref } from 'vue'

const isDark = ref(false)

// Función para alternar tema
const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
    <div
        :class="['min-h-screen flex flex-col transition-colors', isDark ? 'bg-gray-900 text-white' : 'bg-white text-black']">

        <Navbar />

        <main class="flex-1 flex items-center justify-center w-full p-4">
            <slot />
        </main>

        <ButtonToggleTheme :isDark="isDark" @toggle="toggleTheme" />
    </div>
</template>
