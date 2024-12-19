<template>
  <div class="mb-4">
    <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
      <h2 class="text-lg font-bold text-gray-800"><i class="fas fa-comments"></i> Preguntas Filtro</h2>
      <span class="transition-transform">

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


              <div class="mt-2">
                <div v-for="(respuesta, rIndex) in pregunta.respuestas" :key="rIndex"
                  class="flex items-center space-x-3 mb-2">
                  <input type="radio" v-model="pregunta.seleccionada" :value="respuesta.texto"
                    class="form-radio text-blue-600 focus:ring-blue-500">
                  <input v-model="respuesta.texto" type="text"
                    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe una opción" />
                  <button @click="eliminarRespuesta(index, rIndex)" type="button"
                    class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button @click="agregarRespuesta(index)" type="button" class="text-blue-500 hover:text-blue-700">
                  + Agregar opción
                </button>
              </div>


              <div class="flex items-center mt-2">
                <input type="checkbox" v-model="pregunta.excluyente" class="mr-2">
                <label class="text-sm text-gray-600">Pregunta excluyente</label>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No hay preguntas disponibles.</div>


      <div class="flex justify-center">
        <button @click="agregarPregunta" type="button"
          class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-2 bg-blue-500  font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          + Agregar pregunta
        </button>
      </div>



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
import { ref, onMounted, defineEmits } from 'vue';
import { useObtenerPreguntasFiltro } from '@/modules/curriculum/composables/useObtenerPreguntasFiltro';
import { useCrearPreguntaFiltro } from '@/modules/curriculum/composables/useCrearPreguntaFiltro';
import { useObtenerPreguntasPredeterminadas } from '@/modules/curriculum/composables/useObtenerPreguntasPredeterminadas';
import { watch } from 'vue';
import { useApi } from '@/composables/use-api';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['saveFilters']);


const mostrarModal = ref(false);
const preguntasPredeterminadas = ref([]);
const preguntasFiltroActive = ref(false);
const preguntas = ref([]);
const tiposPreguntas = ref([]);
const obtenerPreguntasFiltro = useObtenerPreguntasFiltro();
const crearPreguntaFiltro = useCrearPreguntaFiltro();
const obtenerPreguntasPredeterminadas = useObtenerPreguntasPredeterminadas();
const currentIndex = ref(null);
const cargarCompletado = ref(false);
// const cargarPreguntasExistentes = async () => {
//   try {
//     const response = await useApi.get(`/api/v1/curriculum/preguntas/${props.id}`);
//     const preguntasData = Array.isArray(response) ? response : response.data || [];

//     if (!Array.isArray(preguntasData)) {
//       console.error("La respuesta no contiene un arreglo válido:", response);
//       return;
//     }

//     preguntas.value = preguntasData.map((pregunta) => ({
//       id: pregunta.prg_id,
//       tipo: pregunta.prg_tipo_pregunta,
//       texto: pregunta.prg_texto || "",
//       tipoSeleccionado: true,
//       respuestas: [],
//       excluyente: pregunta.prg_pregunta_excluyente === 1,
//       tipoNombre: pregunta.tipo_pregunta,
//       prg_pregunta_predeterminada: pregunta.prg_pregunta_predeterminada || 0,
//     }));

//     console.log("Preguntas cargadas:", preguntas.value);
//   } catch (error) {
//     console.error("Error al cargar preguntas existentes:", error);
//   }
// };

// const cargarPreguntasPorPerfilExistentes = async () => {
//   try {

//     const response = await useApi.get(`/api/v1/curriculum/preguntas-perfil/${props.id}`);
//     const preguntasData = Array.isArray(response) ? response : response.data || [];

//     if (!Array.isArray(preguntasData)) {
//       console.error("La respuesta no contiene un arreglo válido:", response);
//       return;
//     }

//     preguntas.value = preguntasData.map(pregunta => ({
//       id: pregunta.prg_id,
//       tipo: pregunta.prg_tipo_pregunta,
//       texto: pregunta.pregunta,
//       tipoSeleccionado: true,
//       respuestas: pregunta.opcion ? pregunta.opcion.split(" / ").map(opcion => ({ texto: opcion })) : [],
//       excluyente: pregunta.seleccion === 0,
//       tipoNombre: pregunta.tipo_pregunta,
//       prg_pregunta_predeterminada: pregunta.prg_pregunta_predeterminada,
//     }));

//     console.log("Preguntas cargadas con detalles:", preguntas.value);
//   } catch (error) {
//     console.error("Error al cargar preguntas existentes:", error);
//   }
// };



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
  if (currentIndex.value !== null && preguntas.value[currentIndex.value]) {
    let preguntaActual = { ...preguntas.value[currentIndex.value] };

    // Configurar los datos de la pregunta seleccionada
    preguntaActual.texto = pregunta.pregunta;
    preguntaActual.id = pregunta.prg_id;
    preguntaActual.tipo = pregunta.prg_tipo_pregunta; // ID del tipo
    preguntaActual.tipoNombre = pregunta.tipo_pregunta; // "Cerrada" o "Abierta"
    preguntaActual.prg_pregunta_predeterminada = 1;

    // Configurar respuestas iniciales si es cerrada
    if (preguntaActual.tipoNombre === "Cerrada") {
      preguntaActual.respuestas = pregunta.opciones?.split(" / ").map((opcion) => ({
        texto: opcion.trim(),
        seleccionada: false,
      })) || [];
    } else if (preguntaActual.tipoNombre === "Abierta") {
      preguntaActual.respuestas = []; // Las abiertas no tienen respuestas
    }

    preguntas.value[currentIndex.value] = preguntaActual;
    mostrarModal.value = false;

    console.log("Pregunta predeterminada seleccionada:", preguntaActual);
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
  const tipoSeleccionado = tiposPreguntas.value.find((tipo) => tipo.id === pregunta.tipo);

  if (!tipoSeleccionado) {
    console.error("Tipo de pregunta no encontrado.");
    return;
  }

  pregunta.tipoSeleccionado = true;
  pregunta.tipoNombre = tipoSeleccionado.nombre;
  pregunta.texto = "";

  if (pregunta.tipoNombre === "Predeterminada") {
    currentIndex.value = index;
    await cargarPreguntasPredeterminadas();
    pregunta.prg_pregunta_predeterminada = 1;

    const dataInicial = {
      pcom_id: props.id,
      prg_tipo_pregunta: tipoSeleccionado.id,
      prg_pregunta_predeterminada: 1,
    };

    try {
      const response = await crearPreguntaFiltro.mutateAsync(dataInicial);

      if (response.data && response.data.id) {
        pregunta.id = response.data.id;

        // Verificar si la pregunta predeterminada es abierta, cerrada o archivo
        if (pregunta.tipo === "Abierta") {
          pregunta.tipoNombre = "Abierta";
          pregunta.respuestas = [];
        } else if (pregunta.tipo === "Cerrada") {
          pregunta.tipoNombre = "Cerrada";
          pregunta.respuestas = [{ texto: "Sí" }, { texto: "No" }];
          pregunta.excluyente = false;
        } else if (pregunta.tipo === "Archivo") {
          pregunta.tipoNombre = "Archivo";
          pregunta.respuestas = []; // Archivo no necesita respuestas
        }

        console.log("Pregunta predeterminada creada y clasificada correctamente:", pregunta);
      } else {
        console.warn("El servidor no devolvió un ID para la pregunta creada.");
      }
    } catch (error) {
      console.error("Error al crear la pregunta predeterminada:", error);
    }
  } else {
    const dataInicial = {
      pcom_id: props.id,
      prg_tipo_pregunta: tipoSeleccionado.id,
      prg_pregunta_predeterminada: 0,
    };

    try {
      const response = await crearPreguntaFiltro.mutateAsync(dataInicial);

      if (response.data && response.data.id) {
        pregunta.id = response.data.id;
        console.log("Pregunta creada correctamente:", response.data);
      } else {
        console.warn(
          "El servidor no devolvió un ID para la pregunta creada. Buscando la última pregunta creada..."
        );

        const nuevasPreguntas = await useApi.get(`/api/v1/curriculum/preguntas/${props.id}`);
        const ultimaPregunta = nuevasPreguntas.data.find(
          (p) =>
            p.prg_tipo_pregunta === tipoSeleccionado.id &&
            !preguntas.value.some((preg) => preg.id === p.prg_id)
        );

        if (ultimaPregunta) {
          pregunta.id = ultimaPregunta.prg_id;
          pregunta.prg_pregunta_predeterminada = 0;
          console.log("ID sincronizado desde el backend:", ultimaPregunta);
        }
      }
    } catch (error) {
      console.error("Error al crear la pregunta:", error);
    }
  }

  if (pregunta.tipoNombre === "Cerrada") {
    pregunta.respuestas = [{ texto: "Sí" }, { texto: "No" }];
    pregunta.excluyente = false;
    console.log("Pregunta cerrada configurada con respuestas iniciales:", pregunta);
  } else if (pregunta.tipoNombre === "Abierta" || pregunta.tipoNombre === "Archivo") {
    console.log("Pregunta abierta o archivo configurada:", pregunta);
  }

  console.log("Pregunta después de seleccionar tipo:", pregunta);
};

const agregarRespuesta = (index) => {
  if (preguntas.value[index]) {
    preguntas.value[index].respuestas = preguntas.value[index].respuestas || [];
    preguntas.value[index].respuestas.push({ texto: "" });
    console.log("Respuesta agregada:", preguntas.value[index].respuestas);
  } else {
    console.error("No se encontró la pregunta para el índice proporcionado:", index);
  }
};

const eliminarRespuesta = (pIndex, rIndex) => {
  if (preguntas.value[pIndex] && preguntas.value[pIndex].respuestas) {
    preguntas.value[pIndex].respuestas.splice(rIndex, 1);
    console.log("Respuesta eliminada:", preguntas.value[pIndex].respuestas);
  } else {
    console.error(
      `No se pudo eliminar la respuesta. Pregunta en índice ${pIndex} o respuesta en índice ${rIndex} no encontrada.`
    );
  }
};

watch(
  preguntas,
  (newVal) => {
    const preguntasAbiertas = [];
    const preguntasCerradas = [];
    const preguntasArchivo = [];

    for (const pregunta of newVal) {
      const basePregunta = {
        id: pregunta.id,
        pcom_id: props.id,
        prg_tipo_pregunta: pregunta.tipo,
        prg_pregunta_predeterminada: pregunta.prg_pregunta_predeterminada || 0,
        prg_texto: pregunta.texto,
      };

      // Clasificar las preguntas según su tipo
      if (
        pregunta.tipoNombre === "Abierta" ||
        (pregunta.tipoNombre === "Predeterminada" && pregunta.tipo === "Abierta")
      ) {
        preguntasAbiertas.push(basePregunta);
      } else if (
        pregunta.tipoNombre === "Cerrada" ||
        (pregunta.tipoNombre === "Predeterminada" && pregunta.tipo === "Cerrada")
      ) {
        preguntasCerradas.push({
          ...basePregunta,
          respuestas: pregunta.respuestas.map((r) => ({ texto: r.texto })),
          excluyente: pregunta.excluyente || false,
        });
      } else if (pregunta.tipoNombre === "Archivo") {
        preguntasArchivo.push(basePregunta);
      }
    }
    console.log("lo que se esta enviando", preguntasAbiertas,
      preguntasCerradas,
      preguntasArchivo,)
    emit("saveFilters", {
      preguntasAbiertas,
      preguntasCerradas,
      preguntasArchivo,
    });
  },
  { deep: true }
);






// const agregarRespuesta = (index) => {
//   preguntas.value[index].respuestas.push({ texto: "" });
//   console.log("Respuesta agregada:", preguntas.value[index].respuestas);
// };

// const eliminarRespuesta = (pIndex, rIndex) => {
//   preguntas.value[pIndex].respuestas.splice(rIndex, 1);
//   console.log("Respuesta eliminada:", preguntas.value[pIndex].respuestas);
// };






const cargarPreguntas = async () => {
  try {
    const [perfil, existentes] = await Promise.all([
      useApi.get(`/api/v1/curriculum/preguntas-perfil/${props.id}`),
      useApi.get(`/api/v1/curriculum/preguntas/${props.id}`)
    ]);


    const todasLasPreguntas = [...perfil.data, ...existentes.data];


    const preguntasAgrupadas = {};

    todasLasPreguntas.forEach(pregunta => {
      const id = pregunta.prg_id;


      if (!preguntasAgrupadas[id]) {
        preguntasAgrupadas[id] = {
          id: id,
          tipo: pregunta.prg_tipo_pregunta,
          texto: pregunta.pregunta || pregunta.prg_texto || "",
          tipoSeleccionado: true,
          respuestas: [],
          excluyente: pregunta.prg_pregunta_excluyente === 1,
          tipoNombre: pregunta.tipo_pregunta,
          prg_pregunta_predeterminada: pregunta.prg_pregunta_predeterminada || 0,
        };
      }

      if (pregunta.opcion) {
        preguntasAgrupadas[id].respuestas.push({
          texto: pregunta.opcion,
          seleccionada: pregunta.seleccion === 1
        });
      }
    });


    preguntas.value = Object.values(preguntasAgrupadas);

    console.log("Preguntas cargadas y agrupadas:", preguntas.value);
    cargarCompletado.value = true;

  } catch (error) {
    console.error('Error al cargar preguntas:', error);
  }
};


onMounted(async () => {
  await fetchPreguntasFiltro();
  await cargarPreguntas();
});

</script>
