<template>
  <DashboardLayout>
    <!-- Encabezado con logo y título -->
    <div class="flex items-center justify-between p-4 border-b bg-gray-50">
      <div class="flex items-center">
        <!-- Flecha para regresar -->
        <button @click="goBack" class="mr-2 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-xl font-semibold">Video Entrevista</h1>
          <p class="text-sm text-gray-500">Edición del perfil - DESARROLLADOR DE SOFTWARE.</p>
        </div>
      </div>
    </div>

    <!-- Advertencia -->
    <div class="bg-black text-white p-4 text-center mt-6 mx-9 rounded-lg">
      Recuerda que las video entrevistas tendrán una duración de 365 días antes de ser eliminadas de nuestro sistema.
    </div>

    <!-- Estado cuando no hay preguntas agregadas -->
    <div v-if="preguntasSeleccionadas.length === 0" class="p-6 text-center">
      <h2 class="text-xl font-semibold text-gray-800">Aún no has agregado preguntas a tu Video Entrevista.</h2>
      <p class="text-sm text-gray-500 mb-4">Puedes agregar 3 preguntas, cada candidato tendrá hasta 1 minuto para contestar la pregunta. Puedes seleccionarlas de nuestra lista o personalizarlas tú mismo.</p>
    </div>

    <!-- Lista de preguntas seleccionadas -->
    <div v-if="preguntasSeleccionadas.length > 0" class="p-6">
      <div v-for="(pregunta, index) in preguntasSeleccionadas" :key="index" class="bg-white p-4 shadow-md mb-4 flex justify-between items-center rounded-md">
        <div>
          <p class="font-semibold text-gray-800">{{ pregunta }}</p>
          <p class="text-sm text-gray-500">{{ respuestasCount[index] }} respuestas</p>
        </div>
        <div class="flex space-x-4">
          <button class="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-5" />
            </svg>
            Editar
          </button>
          <button @click="eliminarPregunta(index)" class="text-red-600 hover:text-red-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Cuadro para los botones -->
    <div class="bg-gray-200 p-4 rounded-lg shadow-md mt-6">
      <div class="flex justify-center space-x-4">
        <button @click="toggleDrawer" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold">
          + Agregar preguntas predefinidas
        </button>
        <button @click="mostrarModalPersonalizada = true" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold">
          + Agregar pregunta personalizada
        </button>
      </div>
    </div>

    <!-- Drawer de preguntas predefinidas -->
    <transition name="slide">
      <div v-if="mostrarDrawer" class="fixed inset-0 bg-black bg-opacity-30 z-40" @click="toggleDrawer">
        <div class="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-lg z-50 overflow-auto" @click.stop>
          <div class="p-4 border-b">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-blue-600">Preguntas disponibles para entrevista: {{ preguntasSeleccionadas.length }} de 3</h3>
              <button @click="toggleDrawer" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <input v-model="buscar" type="text" placeholder="Buscar categoría" class="mt-4 p-2 border rounded w-full" />
          </div>

          <div class="p-4 bg-white">
            <div v-for="categoria in categoriasFiltradas" :key="categoria.nombre" class="mb-4">
              <div @click="categoria.expandido = !categoria.expandido" class="flex justify-between cursor-pointer">
                <span class="font-semibold">{{ categoria.nombre }}</span>
                <span>{{ categoria.preguntas.length }}</span>
              </div>
              <div v-if="categoria.expandido" class="ml-4 mt-2">
                <ul>
                  <li v-for="pregunta in categoria.preguntas" :key="pregunta" class="border-b py-2 flex justify-between items-center hover:bg-gray-100">
                    {{ pregunta }}
                    <button @click="agregarPregunta(pregunta)" class="text-blue-500 hover:text-blue-700">Agregar</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal para agregar pregunta personalizada -->
    <transition name="fade">
      <div v-if="mostrarModalPersonalizada" class="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center">
        <div class="bg-white rounded-lg w-full max-w-3xl p-6 relative shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Agregar pregunta personalizada</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Columna izquierda (texto de la pregunta) -->
            <div class="p-4 rounded-md border">
              <label for="preguntaPersonalizada" class="block font-semibold text-gray-700 mb-2">Texto de la Pregunta:</label>
              <input v-model="nuevaPreguntaPersonalizada" type="text" id="preguntaPersonalizada" class="w-full p-2 border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500" placeholder="Escribe la pregunta...">
              <label for="escenario" class="block font-semibold text-gray-700 mt-4 mb-2">Escenario:</label>
              <div class="flex justify-between items-center">
                <input v-model="escenario" type="text" id="escenario" class="w-3/4 p-2 border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500" placeholder="Escribe el escenario...">
                <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 shadow">+</button>
              </div>
            </div>

            <!-- Columna derecha (vista previa de la pregunta) -->
            <div class="p-4 rounded-md border bg-gray-50">
              <h4 class="text-lg font-semibold mb-2">{{ nuevaPreguntaPersonalizada || 'Vista previa' }}</h4>
              <p class="text-gray-500">El candidato debe contestar a esta pregunta en video.</p>
            </div>
          </div>

          <!-- Botones de cancelar y guardar -->
          <div class="mt-6 flex justify-end space-x-4">
            <button @click="mostrarModalPersonalizada = false" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 shadow">
              Cancelar
            </button>
            <button @click="guardarPreguntaPersonalizada" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { useRouter } from 'vue-router';
import { usePerfilId } from '@/stores/use-perfil-Id.store';


const router = useRouter();

const goBack = () => {
  const perfilIdStore = usePerfilId();
  console.log("ID del perfil desde store:", perfilIdStore.idPerfil);
   router.push(`/perfil-settings/${perfilIdStore.idPerfil}`);
};

// Estado para mostrar u ocultar el Drawer
const mostrarDrawer = ref(false);
const toggleDrawer = () => {
  mostrarDrawer.value = !mostrarDrawer.value;
};

// Estado para manejar el modal de preguntas personalizadas
const mostrarModalPersonalizada = ref(false);
const nuevaPreguntaPersonalizada = ref('');
const escenario = ref('');

// Estado para la búsqueda
const buscar = ref('');

// Preguntas categorizadas
const categorias = ref([
  {
    nombre: 'Empresa y el puesto',
    preguntas: [
      '¿Con qué tipo de jefe te gustaría trabajar?',
      '¿Consideras que este puesto es superior o inferior a los que has ocupado anteriormente? ¿Por qué?',
      '¿Qué consideras que sería tu mayor aporte para nuestra organización?'
    ],
    expandido: false
  },
  {
    nombre: 'Estilo de trabajo',
    preguntas: [
      '¿Prefieres trabajar solo o en equipo?',
      '¿Cómo manejas el estrés en tu ambiente laboral?'
    ],
    expandido: false
  }
]);

// Computed para filtrar categorías
const categoriasFiltradas = computed(() => {
  if (!buscar.value) return categorias.value;
  return categorias.value.filter(categoria =>
    categoria.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  );
});

// Estado para manejar las preguntas seleccionadas
const preguntasSeleccionadas = ref([]);
const respuestasCount = ref([0]);

// Función para agregar una pregunta predefinida
const agregarPregunta = (pregunta) => {
  if (preguntasSeleccionadas.value.length < 3) {
    preguntasSeleccionadas.value.push(pregunta);
    respuestasCount.value.push(0); // Iniciar con 0 respuestas
  }
  mostrarDrawer.value = false;
};

// Función para eliminar una pregunta seleccionada
const eliminarPregunta = (index) => {
  preguntasSeleccionadas.value.splice(index, 1);
  respuestasCount.value.splice(index, 1);
};

// Función para guardar la pregunta personalizada
const guardarPreguntaPersonalizada = () => {
  if (nuevaPreguntaPersonalizada.value !== '') {
    preguntasSeleccionadas.value.push(nuevaPreguntaPersonalizada.value);
    respuestasCount.value.push(0);
    nuevaPreguntaPersonalizada.value = '';
    escenario.value = '';
    mostrarModalPersonalizada.value = false;
  }
};
</script>

<style scoped>
/* Hover solo para preguntas en el modal */
li:hover {
  background-color: #eaebec; /* color de fondo al hacer hover */
  cursor: pointer; /* puntero para indicar interactividad */
}
</style>
