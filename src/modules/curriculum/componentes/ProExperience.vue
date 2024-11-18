<template>
  <div class="mb-4">
    <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
      <h2 class="text-lg font-bold"><i class="fas fa-briefcase"></i> Experiencia profesional</h2>
      <span class="transition-transform">
        <!-- Toggle Switch -->
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="professionalExperienceActive" class="sr-only" />
          <div
            class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
            :class="{ 'bg-blue-500': professionalExperienceActive, 'bg-gray-300': !professionalExperienceActive }"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
              :class="{ 'translate-x-6 bg-white': professionalExperienceActive, 'bg-neutral-400': !professionalExperienceActive }"
            ></span>
          </div>
        </label>
      </span>
    </div>

    <div v-if="professionalExperienceActive" class="p-4 border border-t-0 rounded-b-lg">
      <form>
        <!-- Nombre del Cargo -->
        <div class="mb-4">
          <label for="cargo" class="block text-gray-700 text-sm font-bold mb-2">Nombre del cargo</label>
          <input
            v-model="cargo"
            type="text"
            id="cargo"
            placeholder="Ingresa el nombre del cargo"
            required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Años de experiencia -->
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="experienceYearsDesde" class="block text-gray-700 text-sm font-bold mb-2">Desde</label>
            <input
              v-model="experienceYearsDesde"
              type="number"
              id="experienceYearsDesde"
              placeholder="Inserta el valor mínimo de años de experiencia requeridos"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="excluyenteExperiencia && !experienceYearsDesde" class="text-red-500 text-sm mt-1">
              Este campo es obligatorio debido a la selección excluyente.
            </p>
          </div>
          <div>
            <label for="experienceYearsHasta" class="block text-gray-700 text-sm font-bold mb-2">Hasta</label>
            <input
              v-model="experienceYearsHasta"
              type="number"
              id="experienceYearsHasta"
              placeholder="Inserta el valor máximo de años de experiencia requeridos"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="excluyenteExperiencia && !experienceYearsHasta" class="text-red-500 text-sm mt-1">
              Este campo es obligatorio debido a la selección excluyente.
            </p>
          </div>
        </div>

        <!-- Modal de Áreas Laborales -->
        <div class="mb-4">
          <label for="areas-laboral" class="block text-gray-700 text-sm font-bold mb-2">Áreas Laborales</label>
          <div class="relative">
            <input
              v-model="areasLaborales"
              type="text"
              id="areas-laboral"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona o inserta la(s) área(s) laborales requeridas"
              readonly
            />
            <button @click="abrirModal" class="absolute right-0 top-0 mt-2 mr-2" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal de selección de áreas laborales -->
        <div v-if="mostrarModal" class="fixed z-50 inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 text-center">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="cerrarModal">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
              @click.stop
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-3xl"
            >
              <div class="bg-blue-500 text-white p-4">
                <h3 class="text-lg font-semibold">Áreas Laborales</h3>
              </div>
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="mb-4">
                  <input v-model="buscarArea" type="text" placeholder="Buscar..." class="w-full p-2 border rounded-lg" />
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                  <label v-for="area in areasFiltradas" :key="area" class="inline-flex items-center">
                    <input type="checkbox" v-model="areasSeleccionadas" :value="area" class="form-checkbox" />
                    <span class="ml-2">{{ area }}</span>
                  </label>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  @click="guardarAreas"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Guardar
                </button>
                <button
                  @click="cerrarModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="mt-4 text-center">
        <button @click="mostrarMasExperiencia" type="button" class="text-blue-500 hover:text-blue-700 focus:outline-none">
          {{ mostrarDetalleExperiencia ? "Ver menos ▲" : "Ver más ▼" }}
        </button>
      </div>

      <!-- Campos Excluyentes -->
      <div v-if="mostrarDetalleExperiencia" class="bg-red-100 border border-red-300 p-4 rounded-lg mb-6 mt-4">
        <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
        <p class="text-sm text-red-500 mb-4">
          Advertencia: selecciona los campos que son indispensables para el perfil. Ten en cuenta que si un candidato
          no cumple con un campo excluyente será descartado del proceso.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="excluyenteExperiencia" value="experiencia" class="form-checkbox text-red-500" />
            <span class="ml-2">Experiencia</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/use-api";

// Estado principal
const professionalExperienceActive = ref(false);
const cargo = ref("");
const experienceYearsDesde = ref("");
const experienceYearsHasta = ref("");
const excluyenteExperiencia = ref(false);

// Modal de Áreas Laborales
const mostrarModal = ref(false);
const buscarArea = ref("");
const areasSeleccionadas = ref([]);
const areasLaborales = ref("");

// Abrir y cerrar modal
const abrirModal = () => {
  mostrarModal.value = true;
};
const cerrarModal = () => {
  mostrarModal.value = false;
};

// Fetch áreas laborales desde el backend
const areasDisponibles = ref([]);
const areasFiltradas = computed(() => {
  if (!buscarArea.value) return areasDisponibles.value;
  return areasDisponibles.value.filter((area) =>
    area.toLowerCase().includes(buscarArea.value.toLowerCase())
  );
});

const fetchAreasLaborales = async () => {
  try {
    const response = await useApi.get("/api/v1/item-catalogo/AREA-LABOR");
    areasDisponibles.value = response.data.map((item) => item["Item Nombre"]);
  } catch (error) {
    console.error("Error al obtener áreas laborales:", error);
  }
};

const guardarAreas = () => {
  areasLaborales.value = areasSeleccionadas.value.join(", ");
  cerrarModal();
};

// Mostrar más detalles
const mostrarDetalleExperiencia = ref(false);
const mostrarMasExperiencia = () => {
  mostrarDetalleExperiencia.value = !mostrarDetalleExperiencia.value;
};

onMounted(fetchAreasLaborales);
</script>
