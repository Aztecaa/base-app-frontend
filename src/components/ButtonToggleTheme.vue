<template>
    <div class="absolute right-2 bottom-2">
        <button @click="$emit('toggle')"
            :class="['px-4 py-2 rounded-lg cursor-pointer', isDark ? 'text-white bg-black border border-transparent transition-colors duration-200 hover:border-indigo-600' : 'bg-black hover:bg-gray-900 text-white']">
            Cambiar tema <span>{{ isDark ? 'Oscuro' : 'Claro' }}</span>
        </button>
    </div>
</template>

<script setup>
defineProps({
    isDark: Boolean
})
</script>
