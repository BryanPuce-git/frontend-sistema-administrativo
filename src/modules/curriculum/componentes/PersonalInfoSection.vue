<template>
    <div class="mb-4">
        <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
            <h2 class="text-lg font-bold">Información personal</h2>
            <span class="transition-transform">
                <!-- Toggle Switch -->
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="personalInfoActive" class="sr-only" />
                    <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
                        :class="{ 'bg-blue-500': personalInfoActive, 'bg-gray-300': !personalInfoActive }">
                        <span
                            class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
                            :class="{
                                'translate-x-6 bg-white': personalInfoActive,
                                'bg-neutral-400': !personalInfoActive
                            }"></span>
                    </div>
                </label>
            </span>
        </div>
        <div v-if="personalInfoActive" class="p-4 border border-t-0 rounded-b-lg">
            <!-- Contenido de la sección Información Personal -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <!-- Edad -->
                <div>
                    <label for="edad-desde" class="block text-gray-700 text-sm font-bold mb-2">Edad Desde</label>
                    <input v-model="edadDesde" type="number" id="edad-desde" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Inserta edad mínima requerida" />
                </div>
                <div>
                    <label for="edad-hasta" class="block text-gray-700 text-sm font-bold mb-2">Edad Hasta</label>
                    <input v-model="edadHasta" type="number" id="edad-hasta" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Inserta edad máxima requerida" />
                </div>

                <!-- Género -->
                <div>
                    <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Selecciona el género
                        requerido</label>
                    <select id="genero" required v-model="genero" 
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">

                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in generoOptions" :key="item['Id']" :value="item['Item Código']">
                            {{ item['Item Nombre'] }} <!-- Cambié esto para usar Item Nombre -->
                        </option>
                    </select>
                </div>

                <!-- Ciudades -->
                <div>
                    <label for="ciudades" class="block text-gray-700 text-sm font-bold mb-2">Selecciona la(s) ciudad(es)
                        donde
                        dispones del cargo</label>
                    <input type="text" id="ciudades" v-model="ciudades" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ciudad(es)" />
                </div>

                <!-- Estado civil -->
                <div>
                    <!-- Mostrar indicador de carga -->
                    <!-- <div v-if="isLoading">Cargando...</div> -->

                    <!-- Selector de estado civil -->
                    <label for="estado-civil" class="block text-gray-700 text-sm font-bold mb-2">
                        Selecciona estado civil requerido
                    </label>
                    <select id="estado-civil" v-model="estadoCivil" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in estadoCivilOptions" :key="item['Id']" :value="item['Item Código']">
                            {{ item['Item Nombre'] }} <!-- Cambié esto para usar Item Nombre -->
                        </option>
                    </select>
                </div>


                <!-- Capacidad de reubicación -->
                <div>
                    <label for="reubicacion" class="block text-gray-700 text-sm font-bold mb-2">¿Capacidad de
                        reubicación?</label>
                    <select id="reubicacion" v-model="reubicacion" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in reubicacionOptions" :key="item['Id']" :value="item['Item Código']">
                            {{ item['Item Nombre'] }} <!-- Cambié esto para usar Item Nombre -->
                        </option>
                    </select>
                </div>

                <!-- Candidatos con discapacidad -->
                <div>
                    <label for="discapacidad" class="block text-gray-700 text-sm font-bold mb-2">¿Candidatos con
                        discapacidad?</label>
                    <select id="discapacidad" v-model="discapacidad" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in discapacidadOptions" :key="item['Id']" :value="item['Item Código']">
                            {{ item['Item Nombre'] }} <!-- Cambié esto para usar Item Nombre -->
                        </option>
                    </select>
                </div>
            </div>

            <!-- Campos Excluyentes -->
            <div class="bg-red-100 border border-red-300 p-4 rounded-lg mb-6">
                <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
                <p class="text-sm text-red-500 mb-4">Advertencia: selecciona los campos que son indispensables para el
                    perfil. Ten en
                    cuenta que si un candidato no cumple con un campo excluyente será descartado del proceso.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentes" value="edad" class="form-checkbox text-red-500">
                        <span class="ml-2">Edad</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentes" value="genero" class="form-checkbox text-red-500">
                        <span class="ml-2">Género</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentes" value="estadoCivil"
                            class="form-checkbox text-red-500">
                        <span class="ml-2">Estado civil</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentes" value="reubicacion"
                            class="form-checkbox text-red-500">
                        <span class="ml-2">Capacidad de reubicación</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentes" value="ciudad" class="form-checkbox text-red-500">
                        <span class="ml-2">Ciudad</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentes" value="discapacidad"
                            class="form-checkbox text-red-500">
                        <span class="ml-2">Candidato con discapacidad</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useConsultarCatalogo } from '@/modules/curriculum/composables/useConsultarCatalogo';


// Estado para manejar qué sección está activa
const personalInfoActive = ref(false);

// Estados del formulario de Información Personal
const edadDesde = ref("");
const edadHasta = ref("");
const genero = ref("");
const ciudades = ref("");
const estadoCivil = ref("");
const reubicacion = ref("");
const discapacidad = ref("");
const excluyentes = ref([]);
const codigoCatalogoEstadoCivil = 'EST-CI';
const codigoCatalogoGenero = 'GEN';
const codigoCatalogoReubicacion = 'CAP-REU';
const codigoCatalogoDiscapacidad = 'DISCAP';
const estadoCivilOptions = ref([]);
const generoOptions = ref([]);
const reubicacionOptions = ref([]);
const discapacidadOptions = ref([]);


const consultarcatalogo = useConsultarCatalogo();

const fetchEstadoCivilOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoEstadoCivil);
        estadoCivilOptions.value = response; // Asignar los datos recibidos a la referencia
        console.log("Datos recibidos del estado civil:", response); // Verificar la estructura de los datos
    } catch (error) {
        console.error("Error al consultar el catálogo de estado civil:", error);
    }
};

const fetchGeneroOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoGenero);
        generoOptions.value = response; // Asignar los datos recibidos a la referencia
        console.log("Datos recibidos del género:", response); // Verificar la estructura de los datos
    } catch (error) {
        console.error("Error al consultar el catálogo de género:", error);
    }
};

const fetchReubicacionOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoReubicacion);
        reubicacionOptions.value = response; // Asignar los datos recibidos a la referencia
        console.log("Datos recibidos del reubicación:", response); // Verificar la estructura de los datos
    } catch (error) {
        console.error("Error al consultar el catálogo de reubicación:", error);
    }
};

const fetchDiscapacidadOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoDiscapacidad);
        discapacidadOptions.value = response; // Asignar los datos recibidos a la referencia
        console.log("Datos recibidos del discapacidad", response); // Verificar la estructura de los datos
    } catch (error) {
        console.error("Error al consultar el catálogo de discapacidad", error);
    }
};
// Ejecuta la función cuando el componente se monta
onMounted(() => {
    fetchEstadoCivilOptions();
    fetchGeneroOptions();
    fetchReubicacionOptions();
    fetchDiscapacidadOptions();
});

</script>