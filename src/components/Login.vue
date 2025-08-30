<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

// 📌 Estado local del formulario
const username = ref('')
const password = ref('')
const error = ref('')

const userStore = useUserStore()
const router = useRouter()

// 🔗 Login
const handleLogin = async () => {
    error.value = '' // limpia error previo
    const ok = await userStore.login(username.value, password.value)
    if (ok) {
        router.push('/dashboard')
    } else {
        error.value = 'Usuario o contraseña incorrectos'
    }
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <input v-model="username" placeholder="Usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <button @click="handleLogin">Iniciar sesión</button>
        <p v-if="error" style="color:red">{{ error }}</p>
    </div>
</template>
