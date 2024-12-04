<template>
  <div class="mb-4">
    <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
      <h2 class="text-lg font-bold text-gray-800"><i class="fas fa-comments"></i> Preguntas Filtro</h2>
      <span class="transition-transform">
        <!-- Toggle Switch -->
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="preguntasFiltroActive" class="sr-only" />
          <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
            :class="{ 'bg-blue-500': preguntasFiltroActive, 'bg-gray-300': !preguntasFiltroActive }">
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
              :class="{
                'translate-x-6 bg-white': preguntasFiltroActive,
                'bg-neutral-400': !preguntasFiltroActive
              }"></span>
          </div>
        </label>
      </span>
    </div>

    <div v-if="preguntasFiltroActive" class="p-4 border border-t-0 rounded-b-lg bg-white shadow-sm">
      <p class="text-sm text-gray-600 mb-4">Agrega preguntas clave para filtrar a tus candidatos.</p>

      <!-- Lista de preguntas añadidas -->
      <div v-if="preguntas.length > 0">
        <div v-for="(pregunta, index) in preguntas" :key="pregunta.id || index"
          class="mb-6 border rounded-lg shadow-sm">
          <div class="flex items-center justify-between bg-gray-50 p-3 rounded-t-lg">
            <div class="flex items-center space-x-3">
              <span class="font-bold text-gray-600">{{ index + 1 }}</span>
              <select v-model="pregunta.tipo" class="border border-gray-300 rounded-lg p-2"
                @change="seleccionarTipo(index)">
                <option disabled value="">Seleccione tipo de pregunta</option>
                <option v-for="tipo in tiposPreguntas" :key="tipo.id" :value="tipo.id">
                  {{ tipo.nombre }}
                </option>
              </select>
            </div>
            <button @click="eliminarPregunta(index)" class="text-gray-500 hover:text-red-600" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Mostrar campos específicos según el tipo de pregunta -->
          <div v-if="pregunta.tipoSeleccionado" class="bg-gray-50 p-4 rounded-b-lg shadow-inner">
            <div
              v-if="pregunta.tipoNombre === 'Abierta' || pregunta.tipoNombre === 'Predeterminada' || pregunta.tipoNombre === 'Archivo'">
              <input v-model="pregunta.texto" type="text"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                :placeholder="pregunta.tipoNombre === 'Abierta' ? 'Escribe la pregunta abierta' :
                  pregunta.tipoNombre === 'Predeterminada' ? 'Selecciona o escribe la pregunta predeterminada' :
                    pregunta.tipoNombre === 'Archivo' ? 'Escriba aquí' : ''" />
            </div>

            <div v-if="pregunta.tipoNombre === 'Cerrada'" class="space-y-2">
              <input v-model="pregunta.texto" type="text"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe la pregunta cerrada" />
              <div v-for="(respuesta, rIndex) in pregunta.respuestas" :key="rIndex"
                class="flex items-center bg-white p-2 rounded-lg shadow-sm">
                <input v-model="respuesta.texto" type="text"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe una opción" />
                <button @click="eliminarRespuesta(index, rIndex)" type="button"
                  class="text-gray-500 hover:text-red-600 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button @click="agregarRespuesta(index)" class="text-blue-500 hover:text-blue-700">
                + Agregar opción
              </button>
              <div class="flex items-center mt-2">
                <input type="checkbox" v-model="pregunta.excluyente" class="mr-2">
                <label class="text-sm text-gray-600">Pregunta excluyente</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No hay preguntas disponibles.</div>

      <!-- Botón para agregar una nueva pregunta -->
      <button @click="agregarPregunta" type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        + Agregar pregunta
      </button>

      <div v-if="mostrarModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end z-50">
        <!-- Sidebar -->
        <div class="bg-white w-72 h-full shadow-lg transform transition-transform duration-300 ease-in-out p-4">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Preguntas Predeterminadas</h3>
          <ul class="space-y-2 max-h-[70vh] overflow-y-auto">
            <li v-for="pregunta in preguntasPredeterminadas" :key="pregunta.prg_id"
              @click="seleccionarPreguntaPredeterminada(pregunta)"
              class="p-2 bg-gray-100 rounded cursor-pointer hover:bg-blue-100">
              {{ pregunta.pregunta }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useObtenerPreguntasFiltro } from '@/modules/curriculum/composables/useObtenerPreguntasFiltro';
import { useCrearPreguntaFiltro } from '@/modules/curriculum/composables/useCrearPreguntaFiltro';
import { useObtenerPreguntasPredeterminadas } from '@/modules/curriculum/composables/useObtenerPreguntasPredeterminadas';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const mostrarModal = ref(false);
const preguntasPredeterminadas = ref([]);
const preguntasFiltroActive = ref(false);
const preguntas = ref([]);
const tiposPreguntas = ref([]);
const obtenerPreguntasFiltro = useObtenerPreguntasFiltro();
const crearPreguntaFiltro = useCrearPreguntaFiltro();
const obtenerPreguntasPredeterminadas = useObtenerPreguntasPredeterminadas();
const currentIndex = ref(null); // Índice de la pregunta actual que está siendo configurada

const fetchPreguntasFiltro = async () => {
  const response = await obtenerPreguntasFiltro.mutateAsync('PREG');
  tiposPreguntas.value = response.map(pregunta => ({
    id: pregunta.Id,
    nombre: pregunta['Item Nombre'],
  }));
};

const cargarPreguntasPredeterminadas = async () => {
  const preguntas = await obtenerPreguntasPredeterminadas.mutateAsync();
  preguntasPredeterminadas.value = preguntas;
  mostrarModal.value = true;
};

const seleccionarPreguntaPredeterminada = (pregunta) => {
  if (currentIndex.value !== null) {
    preguntas.value[currentIndex.value].texto = pregunta.pregunta; // Actualiza el texto de la pregunta predeterminada
    preguntas.value[currentIndex.value].id = pregunta.prg_id; // Establece el ID
    mostrarModal.value = false; // Cierra el modal
  } else {
    preguntas.value.push({
      id: pregunta.prg_id,
      tipo: '',
      texto: pregunta.pregunta,
      tipoSeleccionado: true,
      respuestas: [],
      excluyente: false,
      tipoNombre: 'Predeterminada',
    });
  }
};

const agregarPregunta = () => {
  preguntas.value.push({
    id: null,
    tipo: '',
    texto: '',
    tipoSeleccionado: false,
    respuestas: [],
    excluyente: false,
    tipoNombre: '',
  });
};

const eliminarPregunta = (index) => {
  preguntas.value.splice(index, 1);
};

const seleccionarTipo = async (index) => {
  const pregunta = preguntas.value[index];
  const tipoSeleccionado = tiposPreguntas.value.find(tipo => tipo.id === pregunta.tipo);

  if (!tipoSeleccionado) {
    console.error('Tipo de pregunta no encontrado.');
    return;
  }

  pregunta.tipoSeleccionado = true;
  pregunta.tipoNombre = tipoSeleccionado.nombre;
  pregunta.texto = ""; // Asegúrate de que siempre haya un campo de texto visible

  if (pregunta.tipoNombre === 'Predeterminada') {
    currentIndex.value = index;
    await cargarPreguntasPredeterminadas();
  } else {
    const dataInicial = {
      pcom_id: props.id,
      prg_tipo_pregunta: tipoSeleccionado.id,
      prg_pregunta_predeterminada: 0,
    };

    const response = await crearPreguntaFiltro.mutateAsync(dataInicial);
    if (response.data && response.data.id) {
      pregunta.id = response.data.id;
    }

    if (pregunta.tipoNombre === 'Cerrada') {
      pregunta.respuestas = [{ texto: '' }];
      pregunta.excluyente = false;
    } else if (pregunta.tipoNombre === 'Abierta' || pregunta.tipoNombre === 'Archivo') {
      // No se necesita configuración especial para preguntas abiertas o de archivo
    }
  }
};

const agregarRespuesta = (index) => {
  preguntas.value[index].respuestas.push({ texto: '' });
};

const eliminarRespuesta = (pIndex, rIndex) => {
  preguntas.value[pIndex].respuestas.splice(rIndex, 1);
};

onMounted(fetchPreguntasFiltro);
</script>
