<template>
  <div class="absolute right-2 bottom-2">
    <button @click="$emit('toggle')"
      class="px-4 py-2 w-fit self-center rounded-lg cursor-pointer transition-colors duration-200 bg-black text-white hover:bg-gray-900 dark:bg-transparent dark:border dark:border-transparent dark:hover:border-indigo-600 dark:text-white">
      Cambiar tema <span>{{ isDark ? "Oscuro" : "Claro" }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  isDark: Boolean,
});
</script>
