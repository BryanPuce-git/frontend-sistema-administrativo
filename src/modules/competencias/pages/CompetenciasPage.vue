<template>
  <DashboardLayout>
    <!-- Encabezado de Competencias y Pruebas -->
    <div class="flex items-center justify-between p-4 border-b bg-gray-50">
      <div class="flex items-center">
        <!-- Flecha para regresar -->
        <button @click="goBack" class="mr-2 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-xl font-semibold">Competencias y Pruebas</h1>
          <p class="text-sm text-gray-600">Edición del perfil - Desarrollador de software.</p>
        </div>
      </div>
    </div>

    <!-- Resto del contenido -->
    <div class="max-w-5xl mx-auto p-6">
      <!-- Sumatoria de pesos -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center justify-center w-24 h-24 rounded-full border-4 border-yellow-500 text-yellow-500 font-bold text-2xl">
          {{ sumatoriaPesos }}%
        </div>
        <p class="text-gray-600">Importante: los pesos configurados deben sumar 100%.</p>
      </div>

      <!-- Competencias seleccionadas -->
      <div v-if="competenciasSeleccionadas.length > 0" class="space-y-6 mb-8 mt-6">
        <div v-for="(competencia, index) in competenciasSeleccionadas" :key="index" class="bg-white p-4 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-lg font-semibold">{{ competencia.nombre }}</h3>
              <p class="text-sm text-gray-500">{{ competencia.eje }}</p>
            </div>
            <div>
              <button @click="eliminarCompetencia(index)" class="text-red-500 hover:text-red-700">Eliminar</button>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Slider de Peso -->
            <div class="flex flex-col w-1/2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-gray-600">Peso</span>
                <span class="text-blue-600 font-semibold text-xs">{{ competencia.peso }}%</span>
              </div>
              <input type="range" min="0" max="100" v-model.number="competencia.peso" @input="actualizarPesos(index)" class="slider" />
            </div>

            <!-- Slider de Nivel de desarrollo -->
            <div class="flex flex-col w-1/2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-gray-600">Nivel de desarrollo</span>
                <span class="text-yellow-600 font-semibold text-xs">{{ competencia.nivel }}%</span>
              </div>
              <input type="range" min="0" max="100" v-model.number="competencia.nivel" class="slider slider-yellow" />
            </div>
          </div>
        </div>
      </div>

      <!-- Botón para agregar competencias -->
      <div class="text-center">
        <button @click="toggleCompetencias" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + Agregar competencias
        </button>
      </div>
    </div>

    <!-- Fondo para cerrar el modal al hacer clic fuera -->
    <transition name="fade">
      <div v-if="mostrarPanel" @click="closePanel" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
    </transition>

    <!-- Panel Lateral -->
    <transition name="slide">
      <div v-if="mostrarPanel" ref="panel" class="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg z-50" @click.stop>
        <div class="p-4 border-b">
          <h3 class="text-xl font-bold">Competencias ({{ totalCompetencias }})</h3>
          <input type="text" placeholder="Buscar" v-model="busqueda" class="mt-4 p-2 border rounded w-full" />
        </div>
        <div class="p-4 overflow-y-auto">
          <ul>
            <li v-for="categoria in categoriasFiltradas" :key="categoria.nombre" class="mb-2"> <!-- Reducido el margen inferior -->
              <div class="flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded px-2 py-1" @click="categoria.expandido = !categoria.expandido">
                <span :class="categoria.icono">{{ categoria.nombre }}</span>
                <span>{{ categoria.competencias.length }}</span>
              </div>
              <ul v-if="categoria.expandido" class="mt-1 ml-4"> <!-- Reducido el margen superior -->
                <li v-for="competencia in categoria.competencias" :key="competencia" class="pl-2 py-1 border-b flex justify-between items-center hover:bg-gray-100 rounded">
                  <!-- Cambiado para hacer clic en el nombre de la competencia para agregarla -->
                  <span @click="agregarCompetencia(competencia, categoria.nombre)" class="cursor-pointer text-gray-600 hover:text-gray-900">{{ competencia }}</span>
                  <button @click="mostrarInfo(competencia)" class="text-gray-500 hover:text-gray-700 ml-2">ℹ️</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- Modal de información de competencia -->
    <transition name="fade">
      <div v-if="mostrarModalInfo" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
          <h3 class="text-lg font-bold mb-4">Información de Competencia</h3>
          <p>{{ competenciaInfo }}</p>
          <div class="text-right mt-4">
            <button @click="cerrarModalInfo" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Cerrar</button>
          </div>
        </div>
      </div>
    </transition>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { useRouter } from 'vue-router';
import { usePerfilId } from '@/stores/use-perfil-Id.store';

const router = useRouter();

const goBack = () => {
  const perfilIdStore = usePerfilId();
  console.log("ID del perfil desde store:", perfilIdStore.idPerfil);
   router.push(`/perfil-settings/${perfilIdStore.idPerfil}`);
};

const mostrarPanel = ref(false);
const busqueda = ref('');
const competenciasSeleccionadas = ref([]);
const totalCompetencias = ref(118); // Total de competencias disponibles
const seccionActiva = ref('competencias'); // Para el encabezado
const mostrarModalInfo = ref(false);
const competenciaInfo = ref('');

const toggleCompetencias = () => {
  mostrarPanel.value = !mostrarPanel.value;
};

const closePanel = () => {
  mostrarPanel.value = false;
};

const mostrarInfo = (competencia) => {
  competenciaInfo.value = `Información detallada sobre ${competencia}.`;
  mostrarModalInfo.value = true;
};

const cerrarModalInfo = () => {
  mostrarModalInfo.value = false;
};

const agregarCompetencia = (competencia, eje) => {
  if (!competenciaYaSeleccionada(competencia)) {
    competenciasSeleccionadas.value.push({
      nombre: competencia,
      eje: eje,
      peso: Math.round(100 / (competenciasSeleccionadas.value.length + 1)),
      nivel: 50
    });
    actualizarPesos();
  }
};

const competenciaYaSeleccionada = (competencia) => {
  return competenciasSeleccionadas.value.some(c => c.nombre === competencia);
};

const eliminarCompetencia = (index) => {
  competenciasSeleccionadas.value.splice(index, 1);
  actualizarPesos();
};

// Función para actualizar los pesos cuando se ajusta el slider
const actualizarPesos = (indexModificado) => {
  const totalPesos = competenciasSeleccionadas.value.reduce((sum, comp) => sum + comp.peso, 0);

  if (totalPesos > 100) {
    const exceso = totalPesos - 100;
    competenciasSeleccionadas.value.forEach((competencia, index) => {
      if (index !== indexModificado) {
        competencia.peso = Math.max(0, Math.round(competencia.peso - exceso / (competenciasSeleccionadas.value.length - 1)));
      }
    });
  }
};

// Computed para la sumatoria de los pesos
const sumatoriaPesos = computed(() => {
  const total = competenciasSeleccionadas.value.reduce((sum, comp) => sum + comp.peso, 0);
  return Math.round(total);
});

const categorias = ref([
  {
    nombre: 'Actualizables',
    competencias: ['Apertura al cambio', 'Aptitud numérica', 'Aptitud Verbal'],
    expandido: false,
    icono: '⚡',
  },
  {
    nombre: 'Administrativas',
    competencias: ['Planificación', 'Gestión de proyectos'],
    expandido: false,
    icono: '🔧',
  },
  {
    nombre: 'Cognitivas',
    competencias: ['Creatividad', 'Pensamiento analítico'],
    expandido: false,
    icono: '🧠',
  },
]);

// Computed property to filter categories based on the search query
const categoriasFiltradas = computed(() => {
  if (!busqueda.value) {
    return categorias.value;
  }
  const searchLowerCase = busqueda.value.toLowerCase();
  return categorias.value.filter(categoria => categoria.nombre.toLowerCase().includes(searchLowerCase));
});


</script>

<style scoped>
.slider {
  @apply appearance-none w-full h-2 bg-blue-500 rounded-full cursor-pointer;
  transition: background-size 0.3s;
}

.slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-blue-500 rounded-full cursor-pointer;
}

.slider::-moz-range-thumb {
  @apply appearance-none w-4 h-4 bg-blue-500 rounded-full cursor-pointer;
}

.slider-yellow {
  @apply appearance-none w-full h-2 bg-yellow-500 rounded-full cursor-pointer;
  transition: background-size 0.3s;
}

.slider-yellow::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-yellow-500 rounded-full cursor-pointer;
}

.slider-yellow::-moz-range-thumb {
  @apply appearance-none w-4 h-4 bg-yellow-500 rounded-full cursor-pointer;
}

/* Estilo hover para las categorías y competencias */
li div:hover, li ul li:hover {
  background-color: #e6e6e7;
  cursor: pointer;
}
</style>
