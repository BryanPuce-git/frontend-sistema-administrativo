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
            <p class="text-sm text-gray-600 mb-4">Configura los estudios requeridos para desempeñar el cargo.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nivel de Estudios -->
                <!-- Nivel de Estudios -->
                <div>
                    <label for="nivel-estudios" class="block text-gray-700 text-sm font-bold mb-2">Nivel de
                        Estudios</label>
                    <select v-model="nivelEstudios" id="nivel-estudios"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in nivelEstudiosOptions" :key="item['Id']" :value="item['Id']">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                    <!-- Mensaje de advertencia si el campo es excluyente y nivel de estudios está vacío -->
                    <p v-if="excluyente && !nivelEstudios" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>


                <!-- Estado de Estudios -->
                <div>
                    <label for="estado-estudios" class="block text-gray-700 text-sm font-bold mb-2">Estado de
                        Estudios</label>
                    <select v-model="estadoEstudios" id="estado-estudios"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in estadoEstudiosOptions" :key="item['Id']" :value="item['Id']">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                </div>

                <!-- Áreas de Estudio -->
                <div>
                    <label for="areas-estudio" class="block text-gray-700 text-sm font-bold mb-2">Áreas de
                        Estudio</label>
                    <div class="relative">
                        <input v-model="areasEstudio" type="text" id="areas-estudio"
                            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Selecciona o inserta la(s) área(s) de estudio requeridas" readonly />
                        <button @click="abrirModal" class="absolute right-0 top-0 mt-2 mr-2" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-gray-700"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal de selección de áreas de estudio -->
            <div v-if="mostrarModal" class="fixed z-50 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen px-4 text-center">
                    <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="cerrarModal">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div @click.stop
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-3xl">
                        <div class="bg-blue-500 text-white p-4">
                            <h3 class="text-lg font-semibold">Áreas de estudio</h3>
                        </div>
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="mb-4">
                                <input v-model="buscarArea" type="text" placeholder="Buscar..."
                                    class="w-full p-2 border rounded-lg">
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                                <label v-for="area in areasFiltradas" :key="area['Id']"
                                    class="inline-flex items-center">
                                    <input type="checkbox" v-model="areasSeleccionadas" :value="area['Item Nombre']"
                                        class="form-checkbox">
                                    <span class="ml-2">{{ area['Item Nombre'] }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button @click="guardarAreas"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Guardar
                            </button>
                            <button @click="cerrarModal"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 text-center">
                <button @click="mostrarMasEducacion" type="button"
                    class="text-blue-500 hover:text-blue-700 focus:outline-none">
                    Ver más <span v-if="!mostrarDetalleEducacion">▼</span><span v-else>▲</span>
                </button>
            </div>

            <div v-if="mostrarDetalleEducacion" class="mt-4">
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
                        el perfil. Ten en cuenta que si un candidato no cumple con un campo excluyente será descartado
                        del proceso.</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <label class="inline-flex items-center">
                            <input type="checkbox" v-model="excluyente" class="form-checkbox text-red-500">
                            <span class="ml-2">Educación</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useConsultarCatalogo } from '@/modules/curriculum/composables/useConsultarCatalogo';
import { defineProps, defineEmits } from 'vue';
import { useApi } from '@/composables/use-api';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['saveEducation']);

const educationActive = ref(false);
const nivelEstudios = ref("");
const estadoEstudios = ref("");
const institucionEducativa = ref("");
const excluyente = ref(false);
const mostrarDetalleEducacion = ref(false);

const mostrarMasEducacion = () => {
    mostrarDetalleEducacion.value = !mostrarDetalleEducacion.value;
};

// Variables para nivel y estado de estudios
const codigoCatalogoNivelEstudios = 'NIVEL-EST';
const codigoCatalogoEstadoEstudios = 'ESTA-ESTU';
const nivelEstudiosOptions = ref([]);
const estadoEstudiosOptions = ref([]);

const consultarcatalogo = useConsultarCatalogo();

// Variables para el modal de áreas de estudio
const mostrarModal = ref(false);
const buscarArea = ref('');
const areasSeleccionadas = ref([]);
const areasEstudio = ref('');
const codigoCatalogoAreaEstudios = 'AREA-ESTU';
const areaEstudiosOptions = ref([]);

const abrirModal = () => { mostrarModal.value = true; };
const cerrarModal = () => { mostrarModal.value = false; };

// Fetch nivel y estado de estudios
const fetchNivelEstudiosOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoNivelEstudios);
        nivelEstudiosOptions.value = response;
    } catch (error) {
        console.error("Error al consultar nivel de estudios:", error);
    }
};

const fetchEstadoEstudiosOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoEstadoEstudios);
        estadoEstudiosOptions.value = response;
    } catch (error) {
        console.error("Error al consultar estado de estudios:", error);
    }
};

// Fetch áreas de estudio
const fetchAreaEstudiosOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoAreaEstudios);
        areaEstudiosOptions.value = response;
    } catch (error) {
        console.error("Error al consultar áreas de estudio:", error);
    }
};

// Filtrar áreas de estudio
const areasFiltradas = computed(() => {
    if (!buscarArea.value) return areaEstudiosOptions.value;
    return areaEstudiosOptions.value.filter(area =>
        area['Item Nombre'].toLowerCase().includes(buscarArea.value.toLowerCase())
    );
});

// Guardar áreas seleccionadas
const guardarAreas = () => {
    areasEstudio.value = areasSeleccionadas.value.join(', ');
    cerrarModal();
};

// Función para guardar educación y emitir los datos
const guardarEducacion = () => {
    const data = {
        pcom_id: props.id,
        edu_nivel_estudios: nivelEstudios.value || null,
        edu_estado_estudios: estadoEstudios.value || null,
        edu_area_estudios: areasEstudio.value || null,
        edu_institucion_educativa: institucionEducativa.value || null,
        edu_educacion_excluyente: excluyente.value ? 1 : 0,
    };

    console.log("Datos de Educación:", data)
    emit('saveEducation', data);
};

// Watch para observar cambios en los campos de educación y guardar automáticamente
watch(
    [nivelEstudios, estadoEstudios, areasEstudio, institucionEducativa, excluyente],
    guardarEducacion,
    { deep: true }
);

const obtenerEducacion = async () => {
    try {
        const response = await useApi.get(`/api/v1/curriculum/educacion/${props.id}`);
        console.log("Respuesta completa de Educación:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
            const educacionData = response.data[0];

            nivelEstudios.value = educacionData.edu_nivel_estudios || "";
            estadoEstudios.value = educacionData.edu_estado_estudios || "";
            areasEstudio.value = educacionData.edu_area_estudios || "";
            institucionEducativa.value = educacionData.edu_institucion_educativa || "";
            excluyente.value = educacionData.edu_educacion_excluyente === 1;

            console.log("Datos de Educación después de asignar:", {
                nivelEstudios: nivelEstudios.value,
                estadoEstudios: estadoEstudios.value,
                areasEstudio: areasEstudio.value,
                institucionEducativa: institucionEducativa.value,
                excluyente: excluyente.value,
            });
        } else {
            console.warn("No se encontraron datos de educación para este perfil.");
        }
    } catch (error) {
        console.error("Error al obtener la educación:", error);
    }
};

// Fetch data al montar
onMounted(() => {
    fetchNivelEstudiosOptions();
    fetchEstadoEstudiosOptions();
    fetchAreaEstudiosOptions();
    obtenerEducacion();
});
</script>
