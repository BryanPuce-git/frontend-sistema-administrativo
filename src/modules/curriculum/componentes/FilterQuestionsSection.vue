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
            <div v-if="pregunta.tipoNombre === 'Abierta'">
              <input v-model="pregunta.texto" type="text"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe la pregunta abierta" />
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
              <button @click="agregarRespuesta(index)" type="button"
                class="text-blue-500 hover:text-blue-700 mt-2 w-full flex items-center justify-center p-2 border border-dashed border-blue-500 rounded-lg">
                + Agregar opción
              </button>
              <div class="flex items-center mt-2">
                <input type="checkbox" v-model="pregunta.excluyente" class="mr-2">
                <label class="text-sm text-gray-600">Pregunta excluyente</label>
              </div>
            </div>

            <div v-if="pregunta.tipoNombre === 'Archivo'">
              <input v-model="pregunta.texto" type="text"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe la pregunta sobre el archivo" />
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useObtenerPreguntasFiltro } from '@/modules/curriculum/composables/useObtenerPreguntasFiltro';
import { useCrearPreguntaFiltro } from '@/modules/curriculum/composables/useCrearPreguntaFiltro';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const preguntasFiltroActive = ref(false);
const preguntas = ref([]);
const tiposPreguntas = ref([]);
const obtenerPreguntasFiltro = useObtenerPreguntasFiltro();
const crearPreguntaFiltro = useCrearPreguntaFiltro();

const fetchPreguntasFiltro = async () => {
  try {
    const response = await obtenerPreguntasFiltro.mutateAsync('PREG');
    tiposPreguntas.value = response.map(pregunta => ({
      id: pregunta.Id,
      nombre: pregunta['Item Nombre'],
    }));

    console.log("Tipos de preguntas", tiposPreguntas.value)
  } catch (error) {
    console.error('Error al obtener tipos de preguntas:', error);
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

const eliminarPregunta = index => {
  preguntas.value.splice(index, 1);
};

const seleccionarTipo = async (index) => {
  try {
    const pregunta = preguntas.value[index];
    const tipoSeleccionado = tiposPreguntas.value.find((tipo) => tipo.id === pregunta.tipo);

    if (tipoSeleccionado) {
      pregunta.tipoSeleccionado = true;
      pregunta.tipoNombre = tipoSeleccionado.nombre;

      if (pregunta.tipoNombre === 'Cerrada') {
        pregunta.respuestas = [{ texto: 'Sí' }, { texto: 'No' }];
      }

      // Prepara los datos según el tipo de pregunta
      const data = {
        prg_id: props.id,
        prg_pregunta: pregunta.texto,
        ...(pregunta.tipoNombre === 'Cerrada' && {
          prg_opcion: pregunta.respuestas.map((resp) => resp.texto).join(' / '),
          prg_seleccion: 1,
          prg_pregunta_excluyente: pregunta.excluyente ? 1 : 0,
        }),
        ...(pregunta.tipoNombre === 'Archivo' && {
          prh_direccion: 'localhost', // Puedes agregar lógica para la dirección del archivo.
          prh_pregunta_excluyente: pregunta.excluyente ? 1 : 0,
        }),
      };

      // Envía los datos al backend
      const response = await crearPreguntaFiltro.mutateAsync(data);
      console.log('Pregunta creada exitosamente:', response);

      // Actualiza el ID de la pregunta en la lista (si el backend devuelve uno)
      pregunta.id = response.id;
    }
  } catch (error) {
    console.error('Error al enviar la pregunta:', error);
  }
};


const agregarRespuesta = index => {
  preguntas.value[index].respuestas.push({ texto: '' });
};

const eliminarRespuesta = (pIndex, rIndex) => {
  preguntas.value[pIndex].respuestas.splice(rIndex, 1);
};

onMounted(() => {
  fetchPreguntasFiltro();
});
</script>
