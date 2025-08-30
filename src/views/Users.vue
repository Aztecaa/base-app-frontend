<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../store/user'

// 📌 Ejemplo de cómo consumir el store y el backend
const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers() // 🔗 Llama al backend /users
})
</script>

<template>
  <div>
    <h1>Lista de Usuarios (Ejemplo)</h1>
    <ul>
      <!-- 🔗 Se renderizan los usuarios traídos desde el backend -->
      <li v-for="u in userStore.users" :key="u.id">{{ u.username }}</li>
    </ul>
  </div>
</template>