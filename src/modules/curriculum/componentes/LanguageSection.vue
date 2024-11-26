<template>
  <div class="mb-4">
    <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
      <h2 class="text-lg font-bold text-gray-800"><i class="fas fa-globe"></i> Idiomas</h2>
      <span class="transition-transform">
        <!-- Toggle Switch -->
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="idiomasActive" class="sr-only" />
          <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
            :class="{ 'bg-blue-500': idiomasActive, 'bg-gray-300': !idiomasActive }">
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
              :class="{
                'translate-x-6 bg-white': idiomasActive,
                'bg-neutral-400': !idiomasActive
              }"></span>
          </div>
        </label>
      </span>
    </div>

    <div v-if="idiomasActive" class="p-4 border border-t-0 rounded-b-lg bg-gray-50">
      <p class="text-sm text-gray-600 mb-4">Agrega o edita los idiomas requeridos por el cargo.</p>

      <!-- Lista de idiomas seleccionados con opciones para editar -->
      <div v-if="idiomas.length > 0" class="mb-4">
        <div v-for="idioma in idiomas" :key="idioma.idi_id" class="grid grid-cols-4 gap-4 items-center mb-2">
          <!-- Selección de idioma -->
          <div>
            <select v-model="idioma.idi_idioma"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="actualizarIdioma(idioma)">
              <option value="" disabled>Seleccione</option>
              <option v-for="item in idiomasOptions" :key="item.Id" :value="item.Id">
                {{ item['Item Nombre'] }}
              </option>
            </select>
          </div>
          <!-- Selección de nivel -->
          <div>
            <select v-model="idioma.idi_nivel"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              @change="actualizarIdioma(idioma)">
              <option value="" disabled>Seleccione</option>
              <option v-for="item in estadoIdiomasOptions" :key="item.Id" :value="item.Id">
                {{ item['Item Nombre'] }}
              </option>
            </select>
          </div>
          <!-- Botón para eliminar -->
          <button @click="eliminarIdioma(idioma.idi_id)" class="text-gray-500 hover:text-red-600" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Botón para agregar nuevo idioma -->
      <div v-if="!mostrarCampos" class="text-center">
        <button @click="mostrarCampos = true" type="button"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">
          + Agregar Idioma
        </button>
      </div>

      <!-- Campos de selección de idioma y nivel para agregar nuevo idioma -->
      <div v-if="mostrarCampos" class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="idioma" class="block text-gray-700 text-sm font-bold mb-2">Idioma</label>
          <select v-model="nuevoIdioma.idioma"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Seleccione</option>
            <option v-for="item in idiomasOptions" :key="item.Id" :value="item.Id">
              {{ item['Item Nombre'] }}
            </option>
          </select>
        </div>
        <div>
          <label for="nivel" class="block text-gray-700 text-sm font-bold mb-2">Nivel</label>
          <select v-model="nuevoIdioma.nivel"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Seleccione</option>
            <option v-for="item in estadoIdiomasOptions" :key="item.Id" :value="item.Id">
              {{ item['Item Nombre'] }}
            </option>
          </select>
        </div>
      </div>

      <!-- Botón para guardar el idioma seleccionado -->
      <div v-if="mostrarCampos" class="text-center">
        <button @click="agregarIdioma" type="button"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">
          Guardar Idioma
        </button>
      </div>

      <!-- Campos excluyentes -->
      <div class="mt-4 text-center">
        <button @click="mostrarMasIdioma" type="button" class="text-blue-500 hover:text-blue-700 focus:outline-none">
          Ver más <span v-if="!mostrarDetalleIdioma">▼</span><span v-else>▲</span>
        </button>
      </div>
      <div v-if="mostrarDetalleIdioma" class="mt-4">
        <div class="bg-red-100 border border-red-300 p-4 rounded-lg mb-6 mt-4">
          <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
          <p class="text-sm text-black-500 mb-4"><b>Advertencia:</b> selecciona los campos que son indispensables
            para el perfil. Ten en cuenta que si un candidato no cumple con un campo excluyente será descartado
            del proceso.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="todosExcluyentes" @change="actualizarTodosExcluyentes" class="form-checkbox text-red-500">
              <span class="ml-2">Idioma</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useConsultarCatalogo } from '@/modules/curriculum/composables/useConsultarCatalogo';
import { defineProps } from 'vue';
import { useApi } from '@/composables/use-api';

// Props
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const todosExcluyentes = ref(false);

const mostrarDetalleIdioma = ref(false);

const mostrarMasIdioma = () => {
  mostrarDetalleIdioma.value = !mostrarDetalleIdioma.value;
};

// Estados Reactivos
const idiomasActive = ref(false);
const idiomas = ref([]); // Lista de idiomas cargados
const nuevoIdioma = ref({ idioma: '', nivel: '' }); // Nuevo idioma para agregar
const idiomasOptions = ref([]);
const estadoIdiomasOptions = ref([]);
const mostrarCampos = ref(false);

// Consultar catálogos
const consultarcatalogo = useConsultarCatalogo();
const fetchIdiomasOptions = async () => {
  const response = await consultarcatalogo.mutateAsync("IDIOM");
  idiomasOptions.value = response;
};

const fetchEstadoIdiomasOptions = async () => {
  const response = await consultarcatalogo.mutateAsync("ESTA-IDIOM");
  estadoIdiomasOptions.value = response;
};

// Obtener los idiomas existentes
const obtenerIdiomas = async () => {
  try {
    const response = await useApi.get(`/api/v1/curriculum/idiomas/${props.id}`);
    idiomas.value = response.data.map(item => ({
      idi_id: item.idi_id,
      idi_idioma: item.idi_idioma,
      idi_nivel: item.idi_nivel,
      excluyente: item.idi_idioma_excluyente === 1, 
    }));
    todosExcluyentes.value = idiomas.value.every(idioma => idioma.excluyente);
  } catch (error) {
    console.error("Error al obtener los idiomas:", error);
  }
};

// Sincronizar excluyentes
const actualizarTodosExcluyentes = () => {
  idiomas.value.forEach(idioma => {
    idioma.excluyente = todosExcluyentes.value;
    actualizarIdioma(idioma);
  });
};

// Agregar un idioma
const agregarIdioma = async () => {
  if (!nuevoIdioma.value.idioma || !nuevoIdioma.value.nivel) return;
  const data = {
    pcom_id: props.id,
    idi_idioma: nuevoIdioma.value.idioma,
    idi_nivel: nuevoIdioma.value.nivel,
    idi_idioma_excluyente: todosExcluyentes.value ? 1 : 0,
  };
  try {
    const response = await useApi.post("/api/v1/curriculum/idiomas", data);
    idiomas.value.push({
      idi_id: response.data.idi_id,
      idi_idioma: nuevoIdioma.value.idioma,
      idi_nivel: nuevoIdioma.value.nivel,
      excluyente: todosExcluyentes.value,
    });
    nuevoIdioma.value = { idioma: '', nivel: '' };
    mostrarCampos.value = false;
  } catch (error) {
    console.error("Error al guardar el idioma:", error);
  }
};


const actualizarIdioma = async (idioma) => {
  try {
    const data = {
      pcom_id: props.id,
      idi_idioma: idioma.idi_idioma,
      idi_nivel: idioma.idi_nivel,
      idi_idioma_excluyente: idioma.excluyente ? 1 : 0,
    };
    await useApi.patch(`/api/v1/curriculum/idioma/${idioma.idi_id}`, data);
  } catch (error) {
    console.error(`Error al actualizar el idioma con ID ${idioma.idi_id}:`, error);
  }
};

// Eliminar un idioma
const eliminarIdioma = async (idi_id) => {
  try {
    await useApi.delete(`/api/v1/curriculum/idioma/${idi_id}`);
    idiomas.value = idiomas.value.filter(idioma => idioma.idi_id !== idi_id);
  } catch (error) {
    console.error(`Error al eliminar el idioma con ID ${idi_id}:`, error);
  }
};

// Lifecycle Hook
onMounted(async () => {
  await Promise.all([fetchIdiomasOptions(), fetchEstadoIdiomasOptions()]);
  await obtenerIdiomas();
});
</script>
