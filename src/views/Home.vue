/* Home.vue */
<script setup>
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";
import { VITE_SOCKET_URL } from "../config.js";

const socket = io(VITE_SOCKET_URL, {
  withCredentials: true,
});
const stockSupervisor = ref([]);
const mostrarModal = ref(false);
const productoFormulario = ref({
  codigo: "",
  nombre: "",
  proveedor: "",
  categoria: "",
  precioCosto: 0,
  fechaVencimiento: "",
  cantidad: 0,
});
const codigoInput = ref("");
const unidadesAAgregar = ref(0);

// Escanear o escribir código
function manejarCodigo() {
  const codigo = codigoInput.value.trim();
  if (!codigo) return;

  const existente = stockSupervisor.value.find((p) => p.codigo === codigo);

  if (existente) {
    productoFormulario.value = { ...existente };
    unidadesAAgregar.value = 0;
  } else {
    productoFormulario.value = {
      codigo,
      nombre: "",
      fechaVencimiento: "",
      cantidad: 0,
    };
    unidadesAAgregar.value = 0;
  }

  mostrarModal.value = true;
  codigoInput.value = "";
}

function abrirProductoManual() {
  productoFormulario.value = {
    codigo: 0,
    nombre: "",
    fechaVencimiento: "",
    cantidad: 0,
  };
  mostrarModal.value = true;
}
// Guardar en stock
function guardarEnStock() {
  socket.emit("agregarProducto", {
    ...productoFormulario.value,
    cantidad: Number(unidadesAAgregar.value),
  });

  mostrarModal.value = false;
}

// Editar producto manualmente
function editarProducto(p) {
  productoFormulario.value = { ...p };
  unidadesAAgregar.value = 0;
  mostrarModal.value = true;
}

// Eliminar producto
function eliminarProducto(codigo) {
  socket.emit("eliminarProducto", codigo);
}

// Sincronización con backend + localStorage
onMounted(() => {
  // 1️⃣ Cargar cache SOLO como fallback inicial
  const cache = localStorage.getItem("stock");
  if (cache) {
    try {
      stockSupervisor.value = JSON.parse(cache);
    } catch (e) {
      console.error("❌ Error leyendo localStorage:", e);
    }
  }

  // 2️⃣ Socket siempre manda la verdad
  socket.on("stockActualizado", (data) => {
    console.log("📦 Stock actualizado desde socket:", data);
    stockSupervisor.value = data;

    localStorage.setItem(
      "stock",
      JSON.stringify(
        data.map((p) => ({
          codigo: p.codigo,
          nombre: p.nombre,
          fechaVencimiento: p.fechaVencimiento,
          cantidad: p.cantidad,
        }))
      )
    );
  });
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h2 class="text-xl font-bold mb-4">📦 Supervisor - Gestionar Stock</h2>

    <input
      v-model="codigoInput"
      @keyup.enter="manejarCodigo"
      class="border p-2 rounded w-full text-black dark:text-white"
      placeholder="Escanea o escribe un código"
    />

    <button
      @click="abrirProductoManual"
      class="mb-2 px-3 py-1 bg-green-600 text-white rounded"
    >
      ➕ Producto sin código
    </button>

    <table class="w-full border mt-4 bg-slate-600">
      <thead>
        <tr>
          <th class="border p-2">Código</th>
          <th class="border p-2">Nombre</th>
          <th class="border p-2">Unidades</th>
          <th class="border p-2">Fecha Vencimiento</th>
          <th class="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in stockSupervisor" :key="p.codigo">
          <td class="border p-2">{{ p.codigo }}</td>
          <td class="border p-2">{{ p.nombre }}</td>
          <td class="border p-2">{{ p.cantidad }}</td>
          <td class="border p-2">{{ p.fechaVencimiento }}</td>
          <td class="border p-2">
            <button
              @click="editarProducto(p)"
              class="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
            >
              <i class="fa-solid fa-pencil"></i>
            </button>
            <button
              @click="eliminarProducto(p.codigo)"
              class="px-2 py-1 bg-red-600 text-white rounded"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-jonasblue2 dark:bg-slate-700 p-6 rounded shadow w-96 relative">
        <h2 class="text-lg font-bold mb-4">Agregar / Editar Producto</h2>

        <div class="mb-2">
          <label class="block text-sm">Código:</label>
          <input
            v-model="productoFormulario.codigo"
            class="border p-1 w-full rounded text-black dark:text-white"
            type="number"
          />
        </div>

        <div class="mb-2">
          <label class="block text-sm">Nombre:</label>
          <input
            v-model="productoFormulario.nombre"
            class="border p-1 w-full rounded text-black dark:text-white"
          />
        </div>

        <div class="mb-2">
          <label class="block text-sm">Fecha:</label>
          <input
            v-model="productoFormulario.fechaVencimiento"
            type="date"
            class="border p-1 w-full rounded text-black dark:text-white"
          />
        </div>

        <div class="mb-2">
          <label class="block text-sm">Unidades a agregar:</label>
          <input
            v-model.number="unidadesAAgregar"
            type="number"
            min="0"
            class="border p-1 w-full rounded text-black dark:text-white"
          />
        </div>

        <div class="mb-2">
          <label>Proveedor:</label>
          <input v-model="productoFormulario.proveedor" />
        </div>

        <div class="mb-2">
          <label>Categoría:</label>
          <input v-model="productoFormulario.categoria" />
        </div>

        <div class="mb-2">
          <label>Precio costo:</label>
          <input type="number" v-model.number="productoFormulario.precioCosto" />
        </div>

        <p>
          Precio venta:
          {{ Math.round(productoFormulario.precioCosto * 1.7) }}
        </p>

        <p class="text-sm mt-2">Stock actual: {{ productoFormulario.cantidad }}</p>
        <p class="text-sm">
          Nuevo total:
          {{ (productoFormulario.cantidad || 0) + (Number(unidadesAAgregar) || 0) }}
        </p>

        <div class="flex justify-end gap-2 mt-4">
          <button @click="mostrarModal = false" class="px-3 py-1 rounded bg-gray-400">
            Cancelar
          </button>
          <button
            @click="guardarEnStock"
            class="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
