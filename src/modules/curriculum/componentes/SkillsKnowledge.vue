<template>
  <div class="mb-4">
    <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
      <h2 class="text-lg font-bold text-gray-800"><i class="fas fa-tools"></i> Habilidades / Conocimientos</h2>
      <span class="transition-transform">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="habilidadesActive" class="sr-only" />
          <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
            :class="{ 'bg-blue-500': habilidadesActive, 'bg-gray-300': !habilidadesActive }">
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
              :class="{
                'translate-x-6 bg-white': habilidadesActive,
                'bg-neutral-400': !habilidadesActive
              }"></span>
          </div>
        </label>
      </span>
    </div>

    <div v-if="habilidadesActive" class="p-4 border border-t-0 rounded-b-lg bg-gray-50">
      <p class="text-sm text-gray-600 mb-4">Inserta las habilidades mínimas requeridas por el cargo.</p>

      <div class="mb-4">
        <input v-model="nuevaHabilidad" @keydown.enter.prevent="agregarHabilidad" type="text"
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe aquí la habilidad y presiona Enter" />
      </div>

      <div v-if="noHabilidades" class="text-center text-gray-500">
        No hay ninguna habilidad disponible.
      </div>

      <div v-else>
        <div v-for="(habilidad, index) in habilidades" :key="habilidad.hab_id"
          class="flex items-center justify-between mb-2">
          <span class="text-gray-700">{{ habilidad.nombre }}</span>
          <button @click="eliminarHabilidad(habilidad.hab_id, index)" class="text-gray-500 hover:text-red-600"
            type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="mt-4 text-center">
        <button @click="mostrarMasHabilidades = !mostrarMasHabilidades" type="button"
          class="text-blue-500 hover:text-blue-700 focus:outline-none">
          Ver más <span v-if="!mostrarMasHabilidades">▼</span><span v-else>▲</span>
        </button>
      </div>

      <div v-if="mostrarMasHabilidades" class="mt-4">
        <div class="bg-red-100 border border-red-300 p-4 rounded-lg">
          <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
          <p class="text-sm text-black-500 mb-4"><b>Advertencia:</b> Marca el checkbox si todas las habilidades deben
            ser excluyentes.</p>
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="todosExcluyentes" @change="actualizarExcluyentes"
              class="form-checkbox text-red-500" :disabled="noHabilidades" />
            <span class="ml-2 text-sm">Habilidad</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { useGuardarHabilidades } from '@/modules/curriculum/composables/useGuardarHabilidades';
import { useObtenerHabilidades } from '@/modules/curriculum/composables/useObtenerHabilidades';
import { useEliminarHabilidad } from '@/modules/curriculum/composables/useEliminarHabilidad';
import { useActualizarHabilidad } from '@/modules/curriculum/composables/useActualizarHabilidad';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const habilidadesActive = ref(false);
const nuevaHabilidad = ref('');
const habilidades = ref([]);
const mostrarMasHabilidades = ref(false);
const todosExcluyentes = ref(false);
const noHabilidades = ref(false);

const guardarHabilidades = useGuardarHabilidades();
const obtenerHabilidades = useObtenerHabilidades();
const eliminarHabilidadApi = useEliminarHabilidad();
const actualizarHabilidadApi = useActualizarHabilidad();

const agregarHabilidad = async () => {
  if (nuevaHabilidad.value.trim() !== '') {
    const data = {
      pcom_id: props.id,
      hab_habilidad: nuevaHabilidad.value,
      hab_habilidades_excluyentes: todosExcluyentes.value ? 1 : 0,
    };

    try {
      const response = await guardarHabilidades.mutateAsync(data);
      habilidades.value.push({
        hab_id: response.hab_id,
        nombre: nuevaHabilidad.value,
        excluyente: todosExcluyentes.value,
      });

      nuevaHabilidad.value = '';
      noHabilidades.value = false;
    } catch (error) {
      console.error('Error al guardar habilidad:', error);
    }
  }
};

const eliminarHabilidad = async (hab_id, index) => {
  try {
    await eliminarHabilidadApi.mutateAsync(hab_id);
    habilidades.value.splice(index, 1);

    // Verifica si después de eliminar no quedan habilidades
    if (habilidades.value.length === 0) {
      noHabilidades.value = true;
      todosExcluyentes.value = false;
    }
  } catch (error) {
    console.error('Error al eliminar habilidad:', error);
  }
};

const fetchHabilidades = async () => {
  try {
    const response = await obtenerHabilidades.mutateAsync(props.id);
    habilidades.value = response.map((hab) => ({
      hab_id: hab.hab_id,
      nombre: hab.hab_habilidad,
      excluyente: hab.hab_habilidades_excluyentes === 1,
    }));

    if (habilidades.value.length > 0) {
      todosExcluyentes.value = habilidades.value.every((hab) => hab.excluyente);
      noHabilidades.value = false;
    } else {
      todosExcluyentes.value = false;
      noHabilidades.value = true;
    }
  } catch (error) {
    console.error('Error al obtener habilidades:', error);
    todosExcluyentes.value = false;
    noHabilidades.value = true;
  }
};

const actualizarExcluyentes = async () => {
  try {
    if (habilidades.value.length === 0) {
      Swal.fire('Error', 'No se puede actualizar, no hay habilidades disponibles.', 'error');
      return;
    }

    const newExcluyenteValue = todosExcluyentes.value;

    await Promise.all(
      habilidades.value.map(async (habilidad) => {
        const data = {
          hab_habilidades_excluyentes: newExcluyenteValue ? 1 : 0,
        };
        await actualizarHabilidadApi.mutateAsync({ id: habilidad.hab_id, data });
        habilidad.excluyente = newExcluyenteValue;
      })
    );

  
  } catch (error) {
    console.error('Error al actualizar excluyentes:', error);
  }
};

onMounted(fetchHabilidades);
</script>
