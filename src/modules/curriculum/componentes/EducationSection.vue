<template>
    <div class="mb-4">
        <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
            <h2 class="text-lg font-bold">Educación</h2>
            <span class="transition-transform">
                <!-- Toggle Switch -->
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="educationActive" class="sr-only" />
                    <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
                        :class="{ 'bg-blue-500': educationActive, 'bg-gray-300': !educationActive }">
                        <span
                            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
                            :class="{
                                'translate-x-6 bg-white': educationActive,
                                'bg-neutral-400': !educationActive
                            }"></span>
                    </div>
                </label>
            </span>
        </div>
        <div v-if="educationActive" class="p-4 border border-t-0 rounded-b-lg">
            <!-- Contenido de la sección Educación -->
            <p class="text-sm text-gray-600 mb-4">Configura los estudios requeridos para desempeñar el cargo.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nivel de Estudios -->
                <div>
                    <label for="nivel-estudios" class="block text-gray-700 text-sm font-bold mb-2">Nivel de
                        Estudios</label>
                    <select v-model="nivelEstudios" id="nivel-estudios"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in nivelEstudiosOptions" :key="item['Id']" :value="item['Item Código']">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                </div>

                <!-- Estado de Estudios -->
                <div>
                    <label for="estado-estudios" class="block text-gray-700 text-sm font-bold mb-2">Estado de
                        Estudios</label>
                    <select v-model="estadoEstudios" id="estado-estudios"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in estadoEstudiosOptions" :key="item['Id']"
                            :value="item['Item Código']">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                </div>

                <!-- Áreas de Estudio -->
                <AreaEstudioModal />
            </div>

            <div class="mt-4 text-center">
                <button @click="mostrarMasEducacion" type="button"
                    class="text-blue-500 hover:text-blue-700 focus:outline-none">
                    Ver más <span v-if="!mostrarDetalleEducacion">▼</span><span v-else>▲</span>
                </button>
            </div>

            <!-- Sección adicional que se muestra al hacer clic en "Ver más" -->
            <div v-if="mostrarDetalleEducacion" class="mt-4">
                <!-- Contenido adicional mostrado en la imagen proporcionada -->
                <div>
                    <label for="institucion-educativa" class="block text-gray-700 text-sm font-bold mb-2">Institución
                        Educativa</label>
                    <input v-model="institucionEducativa" type="text" id="institucion-educativa"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Inserta la(s) instituciones donde deseas que el candidato haya estudiado" />
                </div>

                <div class="bg-red-100 border border-red-300 p-4 rounded-lg mb-6 mt-4">
                    <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
                    <p class="text-sm text-red-500 mb-4">Advertencia: selecciona los campos que son indispensables para
                        el
                        perfil. Ten en cuenta que si un candidato no cumple con un campo excluyente será descartado del
                        proceso.
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="excluyentes" value="educacion"
                                class="form-checkbox text-red-500">
                            <span class="ml-2">Educación</span>
                        </label>
                        <!-- Agrega otros campos excluyentes si es necesario -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

import AreaEstudioModal from '@/modules/curriculum/componentes/AreaEstudioModal.vue';
import { useConsultarCatalogo } from '@/modules/curriculum/composables/useConsultarCatalogo';

const educationActive = ref(false);
const nivelEstudios = ref("");
const estadoEstudios = ref("");
const institucionEducativa = ref("");
const excluyentes = ref([]);
const mostrarDetalleEducacion = ref(false);

const mostrarMasEducacion = () => {
    mostrarDetalleEducacion.value = !mostrarDetalleEducacion.value;
};

const codigoCatalogoNivelEstudios = 'NIVEL-EST';
const codigoCatalogoEstadoEstudios = 'ESTA-ESTU';
const nivelEstudiosOptions = ref([]);
const estadoEstudiosOptions = ref([]);

const consultarcatalogo = useConsultarCatalogo();

const fetchNivelEstudiosOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoNivelEstudios);
        nivelEstudiosOptions.value = response; // Asignar los datos recibidos a la referencia
        console.log("Datos recibidos del reubicación:", response); // Verificar la estructura de los datos
    } catch (error) {
        console.error("Error al consultar el catálogo de reubicación:", error);
    }
};

const fetchEstadoEstudiosOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoEstadoEstudios);
        estadoEstudiosOptions.value = response; // Asignar los datos recibidos a la referencia
        console.log("Datos recibidos del reubicación:", response); // Verificar la estructura de los datos
    } catch (error) {
        console.error("Error al consultar el catálogo de reubicación:", error);
    }
};

onMounted(() => {
    fetchNivelEstudiosOptions();
    fetchEstadoEstudiosOptions();
})
</script>