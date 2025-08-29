// 📌 Store de ejemplo: maneja lista de usuarios
// 👉 Lo podés eliminar sin afectar la app base si no vas a usar usuarios

import { defineStore } from 'pinia'
import api from '../services/api'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] // Lista vacía por defecto
    }),
    actions: {
        // 🔗 Acción que pide datos al backend
        async fetchUsers() {
            try {
                const { data } = await api.get('/users') // <-- Conexión con backend
                this.users = data
            } catch (err) {
                console.error('Error al traer usuarios:', err)
            }
        }
    }
})