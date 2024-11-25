<template>
  <div class="mb-4">
    <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
      <h2 class="text-lg font-bold">Salario</h2>
      <span class="transition-transform">
        <!-- Toggle Switch -->
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="salaryActive" class="sr-only" />
          <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
            :class="{ 'bg-blue-500': salaryActive, 'bg-gray-300': !salaryActive }">
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
              :class="{
                'translate-x-6 bg-white': salaryActive,
                'bg-neutral-400': !salaryActive
              }"></span>
          </div>
        </label>
      </span>
    </div>

    <div v-if="salaryActive" class="p-4 border border-t-0 rounded-b-lg">
      <p class="text-sm text-gray-600 mb-4">Inserta el rango salarial disponible para el cargo que buscas. Por defecto
        la moneda es USD.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Salario Desde -->
        <div>
          <label for="salario-desde" class="block text-gray-700 text-sm font-bold mb-2">Desde</label>
          <input v-model="salarioDesde" type="number" id="salario-desde" required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserta valor mínimo" />
          <p v-if="excluyente && !salarioDesde" class="text-red-500 text-sm mt-1">
            Este campo es obligatorio debido a la selección excluyente.
          </p>
        </div>

        <!-- Salario Hasta -->
        <div>
          <label for="salario-hasta" class="block text-gray-700 text-sm font-bold mb-2">Hasta</label>
          <input v-model="salarioHasta" type="number" id="salario-hasta" required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inserta valor máximo" />
          <p v-if="excluyente && !salarioHasta" class="text-red-500 text-sm mt-1">
            Este campo es obligatorio debido a la selección excluyente.
          </p>
        </div>

        <!-- Moneda -->
        <div>
          <label for="moneda" class="block text-gray-700 text-sm font-bold mb-2">Moneda</label>
          <select v-model="moneda" id="moneda" required
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled selected>Seleccione</option>
            <option v-for="item in monedaOptions" :key="item['Id']" :value="item['Id']">
              {{ item['Item Nombre'] }}
            </option>
          </select>
        </div>
      </div>

      <!-- Botón Ver más -->
      <div class="mt-4 text-center">
        <button @click="toggleDetalle" class="text-blue-500 hover:text-blue-700 focus:outline-none" type="button">
          Ver más <span v-if="!mostrarDetalle">▼</span><span v-else>▲</span>
        </button>
      </div>

      <!-- Sección adicional que se muestra al hacer clic en "Ver más" -->
      <div v-if="mostrarDetalle" class="mt-4 bg-red-100 border border-red-300 p-4 rounded-lg">
        <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
        <p class="text-sm text-black-500 mb-4"><b>Advertencia:</b> selecciona el campo "Excluyente" si este rango
          salarial es indispensable. Si un candidato no cumple con el rango, será descartado del proceso.</p>

        <!-- Excluyente -->
        <div class="flex items-center mt-2">
          <label for="excluyente" class="text-gray-700 text-sm font-bold mr-2">Salario</label>
          <input type="checkbox" v-model="excluyente" id="excluyente" class="form-checkbox h-5 w-5 text-red-500">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useConsultarCatalogo } from '@/modules/curriculum/composables/useConsultarCatalogo';
import { defineEmits, defineProps } from 'vue';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['saveSalario']);

// Reactive properties
const salaryActive = ref(false);
const salarioDesde = ref("");
const salarioHasta = ref("");
const moneda = ref("");
const excluyente = ref(false);
const mostrarDetalle = ref(false); // Controla el estado de "Ver más"
const monedaOptions = ref([]);
const codigoCatalogoMoneda = 'MONED';

// Toggle the "Ver más" section
const toggleDetalle = () => {
  mostrarDetalle.value = !mostrarDetalle.value;
};

// Fetch catalog data
const consultarcatalogo = useConsultarCatalogo();
const fetchMonedaOptions = async () => {
  try {
    const response = await consultarcatalogo.mutateAsync(codigoCatalogoMoneda);
    monedaOptions.value = response;
  } catch (error) {
    console.error("Error al consultar el catálogo de moneda:", error);
  }
};

const sal_id = ref(null);

const guardarSalario = () => {
  const data = {
    sal_id: sal_id.value || null,
    pcom_id: props.id,
    sal_desde: salarioDesde.value || null,
    sal_hasta: salarioHasta.value || null,
    sal_moneda: moneda.value || null,
    sal_salario_excluyente: excluyente.value ? 1 : 0,
  };

  emit("saveSalario", data);
  console.log("Enviando datos ...", data);
};


watch([salarioDesde, salarioHasta, moneda, excluyente], guardarSalario, { deep: true });

const debounceTimerSalario = ref(null);

watch([salarioDesde, salarioHasta], ([nuevoDesde, nuevoHasta], [viejoDesde, viejoHasta]) => {
  // Cancelar cualquier temporizador existente para evitar ejecuciones prematuras
  if (debounceTimerSalario.value) {
    clearTimeout(debounceTimerSalario.value);
  }

  debounceTimerSalario.value = setTimeout(() => {
    // Convertir valores de entrada a números para hacer la validación
    const desdeNum = parseFloat(nuevoDesde);
    const hastaNum = parseFloat(nuevoHasta);

    // Validar solo si ambos campos están llenos y son números válidos
    if (!isNaN(desdeNum) && !isNaN(hastaNum)) {
      if (desdeNum > hastaNum) {
        Swal.fire({
          title: "Error",
          text: "El salario mínimo no puede ser mayor que el salario máximo.",
          icon: "error",
          confirmButtonText: "Entendido"
        });

        // Borrar el valor de 'salarioDesde' y 'salarioHasta' automáticamente

        salarioHasta.value = null;
      }
    }

    else if (desdeNum < 0 || hastaNum < 0) {
      Swal.fire({
        title: "Error",
        text: "Los años de experiencia no pueden ser valores negativos.",
        icon: "error",
        confirmButtonText: "Entendido"
      });

      if (desdeNum < 0) salarioDesde.value = null;
      if (hastaNum < 0) salarioHasta.value = null;
    }
  }, 1500);  // Ajusta el tiempo de retardo según sea necesario
}, { deep: true });









const obtenerSalario = async () => {
  try {
    const response = await useApi.get(`/api/v1/curriculum/salario/${props.id}`);
    console.log("Respuesta completa de Salario:", response.data);

    if (Array.isArray(response.data) && response.data.length > 0) {
      const salarioData = response.data[0];

      // Asignar valores

      sal_id.value = salarioData.sal_id || null;
      salarioDesde.value = salarioData.sal_desde || "";
      salarioHasta.value = salarioData.sal_hasta || "";
      moneda.value = salarioData.sal_moneda || "";
      excluyente.value = salarioData.sal_salario_excluyente === 1;

      console.log("Datos de Salario después de asignar:", {
        sal_id: sal_id.value,
        salarioDesde: salarioDesde.value,
        salarioHasta: salarioHasta.value,
        moneda: moneda.value,
        excluyente: excluyente.value,
      });
    } else {
      console.warn("No se encontraron datos de salario para este perfil.");
    }
  } catch (error) {
    console.error("Error al obtener el salario:", error);
  }
};

// Lifecycle
onMounted(() => {
  fetchMonedaOptions();
  obtenerSalario();
});
</script>
