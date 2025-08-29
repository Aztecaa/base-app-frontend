# 🚀 Proyecto Base: Vue 3 + Vite + Pinia + Express

Este proyecto es una **plantilla base** lista para usar en futuros proyectos:

- **Frontend**: Vue 3 + Vite + Pinia + Vue Router
- **Backend**: Node.js + Express
- **Configuración con .env** para mantener variables seguras.

---

## 📂 Estructura

root/
├─ frontend/ # Vite + Vue 3
└─ backend/ # Express

### 1. Clonar el repo
bash
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_REPO>

### 2. Configurar el Backend
cd backend
npm install
Crear archivo .env:

# .env backend
PORT=4000
JWT_SECRET=super_secreto_123
USERS=[{"id":1,"name":"Juan"},{"id":2,"name":"Maria"},{"id":3,"name":"Pedro"}]

### Iniciar backend:
npm run start

### 3. Configurar el Frontend
cd ../frontend
npm install

# .env front
VITE_API_URL=http://localhost:4000

### Iniciar frontend:
npm run dev