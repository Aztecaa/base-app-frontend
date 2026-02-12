<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
    error.value = ''
    isLoading.value = true
    try {
        /* await new Promise(resolve => setTimeout(resolve, 2000)) */
        const ok = await userStore.login(username.value, password.value)
        if (ok) router.push('/')
        else error.value = 'Usuario o contraseña incorrectos'
    } catch (err) {
        error.value = 'Error inesperado'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full h-[100vh]">
        <div class="p-3 flex flex-col max-w-fit rounded-lg gap-3">
            <h2 class="text-center">Login</h2>
            <input class="p-2 bg-gray-200 rounded border border-gray-300" v-model="username" placeholder="Usuario" />
            <input class="p-2 bg-gray-200 rounded border border-gray-300" v-model="password" type="password"
                placeholder="Contraseña" />
            <button
                class="px-4 py-2 w-fit self-center rounded-lg cursor-pointer transition-colors duration-200 bg-black text-white hover:bg-gray-900 dark:bg-transparent dark:border dark:border-transparent dark:hover:border-indigo-600 dark:text-white flex items-center gap-2 justify-center"
                @click="handleLogin" :disabled="isLoading">
                <span v-if="isLoading"
                    class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                {{ isLoading ? 'Iniciando...' : 'Iniciar sesión' }}
            </button>
            <p v-if="error" class="text-red-500">{{ error }}</p>
        </div>
    </div>
</template>
