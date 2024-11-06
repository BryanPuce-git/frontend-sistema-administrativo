<template>
  <DashboardLayout>
    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <!-- Encabezado -->
      <header class="bg-white shadow p-4 flex justify-between items-center relative">
        <h1 class="text-xl font-semibold">Edición del perfil - {{ nombreRecibido }}</h1>

        <!-- Lista de Componentes ya asignados -->
        <!-- <ul class="list-disc ml-3 mt-1">
          <li v-for="componente in componentesAsignados" :key="componente.id_componente" class="text-gray-600">
            {{ componente.no_componente }}
          </li>
        </ul> -->

        <!-- Botón para agregar componentes con un ícono SVG de "+" -->
        <button @click="mostrarComponentesDisponibles = !mostrarComponentesDisponibles"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd" />
          </svg>
          Agregar Componente
        </button>

        <!-- Dropdown de Componentes Disponibles -->
        <div v-if="mostrarComponentesDisponibles" class="absolute right-2 z-10 bg-white shadow-lg p-1 rounded mt-1 w-25"
          style="top: 100%;">
          <h2 class="text-lg font-semibold">Componentes Disponibles</h2>
          <ul class="mt-3">
            <!-- Comprobamos si hay componentes disponibles -->
            <template v-if="componentesDisponibles.length > 0">
              <li v-for="componente in componentesDisponibles" :key="componente.id_componente">
                <button @click="asignarComponente(componente)"
                  class="text-blue-600 hover:underline w-full text-left">
                  {{ componente.no_componente }}
                </button>
              </li>
            </template>
            <template v-else>
              <li class="text-gray-500 text-center">Sin componentes</li>
            </template>
          </ul>
        </div>

      </header>

      <!-- Contenido del cuerpo -->
      <div class="p-6 space-y-6">
        <!-- Sección de Configuración -->
        <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-blue-600">Proceso E-Talent</h2>
          <p class="text-gray-600 mt-2">
            Para lanzar procesos E-Talent debes cumplir con los siguientes requisitos: ...
          </p>
        </div>

        <!-- Formulario y Paneles de Configuración -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white shadow p-4 rounded-lg md:col-span-2">
            <!-- Nombre -->
            <div class="mb-4">
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="nombre" v-model="nombreRecibido"
                class="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
            <!-- Nivel -->
            <div class="mb-4">
              <label for="nivel" class="block text-sm font-medium text-gray-700">Nivel del perfil</label>
              <input type="text" id="nivel" v-model="nivelRecibido"
                class="mt-1 block w-full border-gray-300 rounded-md" />
            </div>
            <!-- Descripción general (incluye Responsabilidades y Requisitos) -->
            <div class="mb-4">
              <label for="descripcionGeneral" class="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea id="descripcionGeneral" class="mt-1 block w-full border-gray-300 rounded-md" rows="10"
                v-model="anuncio"
                placeholder="Aquí puedes poner una descripción de las responsabilidades y requisitos..."></textarea>
            </div>
          </div>




          <div class="space-y-4 flex flex-col">
            <!-- Componente DISC -->
            <div v-if="tieneComponente('DISC')" class="relative bg-white shadow p-4 rounded-lg flex-1">
              <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm font-semibold text-gray-700">DISC</h3>
                <div class="relative">
                  <button @click.stop="toggleMenu('DISC')"
                    class="focus:outline-none hover:bg-gray-200 p-1 rounded transition duration-200">⋮</button>
                  <div v-if="menuAbierto === 'DISC'"
                    class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                    <ul>
                      <li @click.stop="eliminarComponente('DISC')" class="p-2 hover:bg-red-100 cursor-pointer">Eliminar
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <span class="text-green-500">Completo</span>
            </div>

            <!-- Componente CURRICULUM -->
            <div v-if="tieneComponente('CURRICULUM')"
              class="relative bg-white shadow p-4 rounded-lg flex-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              <div @click="irACurriculum" class="flex justify-between items-center mb-2 p-2">
                <h3 class="text-sm font-semibold text-gray-700">CURRICULUM</h3>
                <div class="relative">
                  <button @click.stop="toggleMenu('CURRICULUM')"
                    class="focus:outline-none hover:bg-gray-200 p-1 rounded transition duration-200">⋮</button>
                  <div v-if="menuAbierto === 'CURRICULUM'"
                    class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                    <ul>
                      <li @click.stop="eliminarComponente('CURRICULUM')" class="p-2 hover:bg-red-100 cursor-pointer">
                        Eliminar
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="relative">
                <input type="range" min="0" max="100" v-model="pesoCurriculum"
                  class="w-full h-2 bg-gray-200 rounded-lg overflow-hidden appearance-none cursor-pointer accent-red-500" />
                <span
                  class="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  {{ pesoCurriculum }}%
                </span>
              </div>
            </div>

            <!-- Componente CONOCIMIENTO -->
            <div v-if="tieneComponente('CONOCIMIENTO')"
              class="relative bg-white shadow p-4 rounded-lg flex-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              <div @click="irAKnowledge" class="flex justify-between items-center mb-2 p-2">
                <h3 class="text-sm font-semibold text-gray-700">CONOCIMIENTO</h3>
                <div class="relative">
                  <button @click.stop="toggleMenu('CONOCIMIENTO')"
                    class="focus:outline-none hover:bg-gray-200 p-1 rounded transition duration-200">⋮</button>
                  <div v-if="menuAbierto === 'CONOCIMIENTO'"
                    class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                    <ul>
                      <li @click.stop="eliminarComponente('CONOCIMIENTO')" class="p-2 hover:bg-red-100 cursor-pointer">
                        Eliminar</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="relative">
                <input type="range" min="0" max="100" v-model="pesoConocimiento"
                  class="w-full h-2 bg-gray-200 rounded-lg overflow-hidden appearance-none cursor-pointer accent-blue-500" />
                <span
                  class="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  {{ pesoConocimiento }}%
                </span>
              </div>
            </div>

            <!-- Componente COMPETENCIAS -->
            <div v-if="tieneComponente('COMPETENCIAS')"
              class="relative bg-white shadow p-4 rounded-lg flex-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              <div @click="irACompetencia" class="flex justify-between items-center mb-2 p-2">
                <h3 class="text-sm font-semibold text-gray-700">COMPETENCIAS</h3>
                <div class="relative">
                  <button @click.stop="toggleMenu('COMPETENCIAS')"
                    class="focus:outline-none hover:bg-gray-200 p-1 rounded transition duration-200">⋮</button>
                  <div v-if="menuAbierto === 'COMPETENCIAS'"
                    class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                    <ul>
                      <li @click.stop="eliminarComponente('COMPETENCIAS')" class="p-2 hover:bg-red-100 cursor-pointer">
                        Eliminar</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="relative">
                <input type="range" min="0" max="100" v-model="pesoCompetencias"
                  class="w-full h-2 bg-gray-200 rounded-lg overflow-hidden appearance-none cursor-pointer accent-purple-500" />
                <span
                  class="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-purple-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  {{ pesoCompetencias }}%
                </span>
              </div>
            </div>

            <!-- Componente VIDEO ENTREVISTA -->
            <div v-if="tieneComponente('VIDEO ENTREVISTA')"
              class="relative bg-white shadow p-4 rounded-lg flex-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
              <div @click="irAEntrevista" class="flex justify-between items-center mb-2 p-2">
                <h3 class="text-sm font-semibold text-gray-700">VIDEO ENTREVISTA</h3>
                <div class="relative">
                  <button @click.stop="toggleMenu('VIDEO ENTREVISTA')"
                    class="focus:outline-none hover:bg-gray-200 p-1 rounded transition duration-200">⋮</button>
                  <div v-if="menuAbierto === 'VIDEO ENTREVISTA'"
                    class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                    <ul>
                      <li @click.stop="eliminarComponente('VIDEO ENTREVISTA')"
                        class="p-2 hover:bg-red-100 cursor-pointer">
                        Eliminar</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="relative">
                <input type="range" min="0" max="100" v-model="pesoVideoEntrevista"
                  class="w-full h-2 bg-gray-200 rounded-lg overflow-hidden appearance-none cursor-pointer accent-orange-500" />
                <span
                  class="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  {{ pesoVideoEntrevista }}%
                </span>
              </div>
            </div>

            <!-- Sumatoria de Pesos -->
            <div class="bg-white shadow p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-yellow-500">Sumatoria de pesos</h3>
              <div class="flex items-center mt-2">
                <div class="h-24 w-24 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                  <span class="text-2xl font-bold">{{ sumatoriaPesos }}%</span>
                </div>
                <p class="text-gray-600 ml-4">Importante: los pesos configurados deben sumar 100%.</p>
              </div>
            </div>
          </div>


        </div>
      </div>

      <!-- Botón de acción flotante -->
      <button @click="mostrarModal = true" :disabled="sumatoriaPesos !== 100"
        class="fixed bottom-4 right-4 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600"
        :class="{ 'opacity-50 cursor-not-allowed': sumatoriaPesos !== 100 }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Modal -->
      <transition name="fade">
        <div v-if="mostrarModal" @click.self="cerrarModal"
          class="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6 relative shadow-lg w-96 text-center z-60">
            <h3 class="text-lg font-semibold mb-4">¿Qué deseas hacer con tu nuevo perfil?</h3>
            <p class="text-gray-600 mb-6">Puedes lanzar un proceso con este perfil o ver todos los perfiles.</p>

            <div class="flex justify-center space-x-6">
              <button @click="cerrarModal" class="text-blue-600 hover:underline">Permanecer</button>
              <button @click="irAPerfiles" class="text-blue-600 hover:underline">Perfiles</button>
              <button @click="irAProceso" class="text-blue-600 hover:underline">Lanzar proceso</button>
            </div>

            <button @click="cerrarModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </DashboardLayout>
</template>


<script setup lang="ts">
import { ref, computed, onMounted  } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { usePerfilStore } from '@/stores/use-perfil.store';
import { useConsultarPerfil } from '@/modules/perfiles/composables/useConsultarPerfil';
// import type { PerfilComponenteResponse } from '../dto/PerfilComponenteResponse.dto';
import { useApi } from '@/composables/use-api';

const perfilStore = usePerfilStore();
const nombre = perfilStore.nombre;
const nivel = perfilStore.nivel;
// const opciones = perfilStore.opciones;
const router = useRouter();
const route = useRoute();

// const perfilSeleccionado = ref<PerfilComponenteResponse[]>([]);
const consultarPerfil = useConsultarPerfil();

const nivelRecibido = ref('');
const anuncio = ref('');
const componentesDisponibles = ref<Componente[]>([]);
const nombreRecibido = ref<string>('');
// Arreglo de componentes asignados
const mostrarComponentesDisponibles = ref<boolean>(false); // Estado de visibilidad del dropdown

const componentesAsignados = ref<Componente[]>([]);// Aquí se guardan los componentes obtenidos de la API
const pesoCurriculum = ref(0);
const pesoConocimiento = ref(0);
const pesoCompetencias = ref(0);
const pesoVideoEntrevista = ref(0);



const obtenerDatoDePerfil = async (perfilId: number) => {
  try {
    const response = await consultarPerfil.mutateAsync({ perfilId });
    // console.log('Respuesta de la API:', response);
    if (Array.isArray(response) && response.length > 0) {
      const perfil = response[0];
      nombreRecibido.value = perfil.Perfil;
      nivelRecibido.value = perfil.Dificultad;
      anuncio.value = perfil.Anuncio;

      // console.log(nombreRecibido.value, nivelRecibido.value, anuncio.value);
    }

  } catch (error) {
    console.error('Error al obtener los datos del perfil:', error);
  }
};


// Función para obtener los componentes disponibles
const agregarComponente = async (perfilId: number) => {
  try {
    const response = await useApi.get(`/api/v1/Perfiles-Componentes/NoComponentes/${perfilId}`);

    if (Array.isArray(response.data) && response.data.length > 0) {
      componentesDisponibles.value = response.data; // Guardar los componentes disponibles

    } else {
      console.warn('No hay componentes disponibles para agregar.');
    }
  } catch (error) {
    console.error('Error al obtener los componentes disponibles:', error);
  }
};


const asignarComponente = (componente : Componente) => {
  // Solo agregar si el componente no está ya en la lista asignada
  if (!componentesAsignados.value.some(c => c.id_componente === componente.id_componente)) {
    componentesAsignados.value.push(componente);
    console.log(`Componente agregado: ${componente.no_componente}`);

    // Asegurarse de que se envía como un arreglo
    actualizarComponentes([componente.id_componente], componente.perf_id); // Envíalo como [id_componente]
  }

  // Eliminarlo de la lista de disponibles
  componentesDisponibles.value = componentesDisponibles.value.filter(c => c.id_componente !== componente.id_componente);
  mostrarComponentesDisponibles.value = false; // Cerrar dropdown
};



const curriculumId = ref<number | null>(null);
const conocimientoId = ref<number | null>(null);
const videoEntrevistaId = ref<number | null>(null);
const discId = ref<number | null>(null);
const competenciasId = ref<number | null>(null);



// Función para obtener los componentes por ID de perfil
const obtenerComponentesPorPerfilId = async (perfilId : number) => {
  try {
    const response = await useApi.get(`/api/v1/Perfiles-Componentes/Componentes/${perfilId}`);
    console.log('Respuesta de componentes:', response.data);

    if (Array.isArray(response.data) && response.data.length > 0) {
      componentesAsignados.value = response.data;

      // Asignar los IDs de cada componente si están presentes en la respuesta
      const asignarIdComponente = (nombre: string, refId: Ref<number | null>) => {
        const componente = componentesAsignados.value.find((c) => c.no_componente === nombre);
        refId.value = componente ? componente.pcom_id : null;
      };

      asignarIdComponente("CURRICULUM", curriculumId);
      asignarIdComponente("CONOCIMIENTO", conocimientoId);
      asignarIdComponente("VIDEO ENTREVISTA", videoEntrevistaId);
      asignarIdComponente("DISC", discId);
      asignarIdComponente("COMPETENCIAS", competenciasId);

      console.log('IDs de componentes:', {
        curriculumId: curriculumId.value,
        conocimientoId: conocimientoId.value,
        videoEntrevistaId: videoEntrevistaId.value,
        discId: discId.value,
        competenciasId: competenciasId.value,
      });

    } else {
      console.warn('No hay componentes asignados para este perfil.');
      componentesAsignados.value = [];
    }
  } catch (error) {
    console.error('Error al obtener los componentes del perfil:', error);
  }
};



const tieneComponente = (nombreComponente: string) => {
  // console.log('Verificando componente:', nombreComponente);

  // Verifica si existe el componente en el array
  const existe = componentesAsignados.value.some(
    (componente) => componente.no_componente === nombreComponente
  );

  return existe;
};

// Ejemplo de uso para verificar varios componentes
// const verificarComponentes = (componentesABuscar: string[]) => {
//   componentesABuscar.forEach((nombreComponente) => {
//     const existe = tieneComponente(nombreComponente);
//     if (existe) {
//       // console.log(`El componente ${nombreComponente} está habilitado.`);
//       // Aquí puedes habilitar el componente en tu estado
//     } else {
//       // console.log(`El componente ${nombreComponente} no existe.`);
//     }
//   });
// };



onMounted(() => {
  const perfilId = Number(route.params.perfilId);

  console.log('Perfil ID:', perfilId); // Verifica el ID
  if (perfilId) {
    obtenerDatoDePerfil(perfilId);
    agregarComponente(perfilId);
    obtenerComponentesPorPerfilId(perfilId);
    // obtenerComponentesAsignados(perfilId);
  }
});



const irAPerfiles = () => {
  router.replace('/perfiles');
}
const irAProceso = () => {
  router.replace('/perfil-launch');
}


const irACurriculum = () => {
  if (curriculumId.value) {
    router.push({ name: '/curriculum', params: { id: curriculumId.value } });
  } else {
    console.warn('ID del componente "CURRICULUM" no disponible.');
  }
};

const irAKnowledge = () => {
  if (conocimientoId.value) {
    router.push({ name: '/conocimiento', params: { id: conocimientoId.value } });
  } else {
    console.warn('ID del componente "CONOCIMIENTO" no disponible.');
  }
};

const irAEntrevista = () => {
  if (videoEntrevistaId.value) {
    router.push({ name: '/entrevista', params: { id: videoEntrevistaId.value } });
  } else {
    console.warn('ID del componente "VIDEO ENTREVISTA" no disponible.');
  }
};

const irACompetencia = () => {
  if (competenciasId.value) {
    router.push({ name: '/competencias', params: { id: competenciasId.value } });
  } else {
    console.warn('ID del componente "COMPETENCIAS" no disponible.');
  }
};

// const irADisc = () => {
//   if (discId.value) {
//     router.push({ name: 'Disc', params: { id: discId.value } });
//   } else {
//     console.warn('ID del componente "DISC" no disponible.');
//   }
// };

// Computed para la sumatoria de los pesos
const sumatoriaPesos = computed(() => {
  const p1 = Math.round(pesoConocimiento.value);
  const p2 = Math.round(pesoCompetencias.value);
  const p3 = Math.round(pesoVideoEntrevista.value);
  const p4 = Math.round(pesoCurriculum.value);
  const total = p1 + p2 + p3 + p4;
  return total;
});

// Estado para controlar el modal
const mostrarModal = ref(false);
const cerrarModal = () => {
  mostrarModal.value = false;
}

// Estado para controlar el menú desplegable
const menuAbierto = ref<string | null>(null);


// Función para alternar el menú
const toggleMenu = (nombreComponente: string) => {
  menuAbierto.value = menuAbierto.value === nombreComponente ? null : nombreComponente;
};

// Función para eliminar un componente
const eliminarComponente = (nombreComponente: string) => {
  componentesAsignados.value = componentesAsignados.value.filter(
    (componente) => componente.no_componente !== nombreComponente
  );
  menuAbierto.value = null; // Cierra el menú después de eliminar
};

// const toggleComponentes = async () => {
//   mostrarComponentesDisponibles.value = !mostrarComponentesDisponibles.value;

//   console.log("CCCCCC",mostrarComponentesDisponibles.value)
//   // Solo mostrar en consola si se está abriendo el dropdown
//   if (mostrarComponentesDisponibles.value) {
//     const perfilId = Number(route.params.perfilId);
//     await agregarComponente(perfilId); // Llama a la función para obtener los componentes no seleccionados
//   }
// };

const actualizarComponentes = async (componentesIds :number[], perfilId : number) => {
  for (const idComp of componentesIds) {
    try {
      await useApi.patch(`/api/v1/Perfiles-Componentes/${perfilId}/${idComp}/${idComp}`);
      console.log(`Componente ${idComp} actualizado correctamente.`);
    } catch (error) {
      console.error(`Error al actualizar el componente ${idComp}:`, error);
    }
  }

  // Opcional: Actualizar la lista de componentes asignados
  // obtenerComponentesAsignados(perfilId); // Recargar componentes asignados desde el servidor si es necesario
};


// const obtenerComponentesAsignados = async (perfilId: number) => {
//   try {
//     const response = await useApi.get(`/api/v1/Perfiles-Componentes/${perfilId}`);
//     componentesAsignados.value = response.data; // Actualiza la lista de componentes asignados
//   } catch (error) {
//     console.error('Error al obtener los componentes asignados:', error);
//   }
// };
</script>
