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
    <div class=" flex flex-col items-center justify-center w-full h-[100vh]">
        <div class="p-3 flex flex-col max-w-fit rounded-lg gap-3">
            <h2 class="text-center">Login</h2>
            <input class="p-2" v-model="username" placeholder="Usuario" />
            <input class="p-2" v-model="password" type="password" placeholder="Contraseña" />
            <button class="px-4 py-2 w-fit self-center rounded-lg cursor-pointer transition-colors duration-200
             !bg-black !text-white hover:bg-gray-900
             dark:bg-transparent dark:border dark:border-transparent dark:hover:border-indigo-600 dark:text-white"
                @click="handleLogin">
                Iniciar sesión
            </button>
            <p v-if="error" style="color:red">{{ error }}</p>
        </div>
    </div>
</template>
