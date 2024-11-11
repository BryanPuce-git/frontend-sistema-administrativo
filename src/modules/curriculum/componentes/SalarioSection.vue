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
                        <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
                              :class="{
                                'translate-x-6 bg-white': salaryActive,
                                'bg-neutral-400': !salaryActive
                              }"></span>
                    </div>
                </label>
            </span>
        </div>

        <div v-if="salaryActive" class="p-4 border border-t-0 rounded-b-lg">
            <p class="text-sm text-gray-600 mb-4">Inserta el rango salarial disponible para el cargo que buscas. Por defecto la moneda es USD.</p>
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
                <p class="text-sm text-black-500 mb-4"><b>Advertencia:</b> selecciona el campo "Excluyente" si este rango salarial es indispensable. Si un candidato no cumple con el rango, será descartado del proceso.</p>

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

// Emit salary data
const guardarSalario = () => {
    const data = {
        pcom_id: props.id,
        sal_desde: salarioDesde.value || null,
        sal_hasta: salarioHasta.value || null,
        sal_moneda: moneda.value || null,
        sal_salario_excluyente: excluyente.value ? 1 : 0
    };

    emit('saveSalario', data);
    console.log("Enviando datos ...", data);
};

// Watch for changes to fields and call guardarSalario
watch(
  [salarioDesde, salarioHasta, moneda, excluyente],
  guardarSalario,
  { deep: true }
);

// Lifecycle
onMounted(() => {
    fetchMonedaOptions();
});
</script>
