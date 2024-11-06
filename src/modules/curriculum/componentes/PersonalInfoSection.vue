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
                    <select id="cuidades" v-model="ciudades" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in ciudadesOptions" :key="item['Id']" :value="item['Item Código']">
                            {{ item['Item Nombre'] }} 
                        </option>
                    </select>
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
                            {{ item['Item Nombre'] }} 
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
                <p class="text-sm text-black-500 mb-4"><b>Advertencia: </b>selecciona los campos que son indispensables para el
                    perfil. Ten en
                    cuenta que si un candidato no cumple con un campo excluyente será descartado del proceso.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesDesdeHasta" value="edad" class="form-checkbox text-red-500">
                        <span class="ml-2">Edad</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesGenero" value="genero" class="form-checkbox text-red-500">
                        <span class="ml-2">Género</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesEstadoCivil" value="estadoCivil"
                            class="form-checkbox text-red-500">
                        <span class="ml-2">Estado civil</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesReubicacion" value="reubicacion"
                            class="form-checkbox text-red-500">
                        <span class="ml-2">Capacidad de reubicación</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesCiudad" value="ciudad" class="form-checkbox text-red-500">
                        <span class="ml-2">Ciudad</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesDiscapacidad" value="discapacidad"
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
import { useGuardarInfoPersonal } from '@/modules/curriculum/composables/useGuardarInfoPersonal';
import { useRoute } from 'vue-router';

const route = useRoute();

const curriculumId = route.params.id;
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
const excluyentesDesdeHasta = ref(false);
const excluyentesEstadoCivil = ref(false);
const excluyentesGenero = ref(false);
const excluyentesCiudad = ref(false);
const excluyentesReubicacion = ref(false);
const excluyentesDiscapacidad = ref(false);
const codigoCatalogoEstadoCivil = 'EST-CI';
const codigoCatalogoGenero = 'GEN';
const codigoCatalogoReubicacion = 'CAP-REU';
const codigoCatalogoDiscapacidad = 'DISCAP';
const codigoCatalogoCuidades = 'CIUD';
const estadoCivilOptions = ref([]);
const generoOptions = ref([]);
const reubicacionOptions = ref([]);
const discapacidadOptions = ref([]);
const ciudadesOptions = ref([]);


const consultarcatalogo = useConsultarCatalogo();

const fetchEstadoCivilOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoEstadoCivil);
        estadoCivilOptions.value = response; 
        console.log("Datos recibidos del estado civil:", response); 
    } catch (error) {
        console.error("Error al consultar el catálogo de estado civil:", error);
    }
};

const fetchGeneroOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoGenero);
        generoOptions.value = response; 
        console.log("Datos recibidos del género:", response); 
    } catch (error) {
        console.error("Error al consultar el catálogo de género:", error);
    }
};

const fetchReubicacionOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoReubicacion);
        reubicacionOptions.value = response; 
        console.log("Datos recibidos del reubicación:", response); 
    } catch (error) {
        console.error("Error al consultar el catálogo de reubicación:", error);
    }
};

const fetchDiscapacidadOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoDiscapacidad);
        discapacidadOptions.value = response; 
        console.log("Datos recibidos del discapacidad", response); 
    } catch (error) {
        console.error("Error al consultar el catálogo de discapacidad", error);
    }
};

const fetchCiudadesOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoCuidades);
        ciudadesOptions.value = response; 
        console.log("Datos recibidos del cuidades", response); 
    } catch (error) {
        console.error("Error al consultar el catálogo de cuidades", error);
    }
}; 

const validarCamposExcluyentes = () => {
    mensajeError.value = ""; // Reinicia el mensaje de error
    if (excluyentesDesdeHasta.value && (!edadDesde.value || !edadHasta.value)) {
        mensajeError.value = "Por favor, complete ambos campos de edad, ya que son excluyentes.";
        return false;
    }
    if (excluyentesGenero.value && !genero.value) {
        mensajeError.value = "Por favor, seleccione un género, ya que es un campo excluyente.";
        return false;
    }
    if (excluyentesEstadoCivil.value && !estadoCivil.value) {
        mensajeError.value = "Por favor, seleccione un estado civil, ya que es un campo excluyente.";
        return false;
    }
    if (excluyentesReubicacion.value && !reubicacion.value) {
        mensajeError.value = "Por favor, seleccione una capacidad de reubicación, ya que es un campo excluyente.";
        return false;
    }
    if (excluyentesCiudad.value && !ciudades.value) {
        mensajeError.value = "Por favor, seleccione una ciudad, ya que es un campo excluyente.";
        return false;
    }
    if (excluyentesDiscapacidad.value && !discapacidad.value) {
        mensajeError.value = "Por favor, seleccione una opción para candidatos con discapacidad, ya que es un campo excluyente.";
        return false;
    }
    return true;
};

const guardarInfoPersonalMutation = useGuardarInfoPersonal();

const guardarInformacionPersonal = async () => {
    if (!validarCamposExcluyentes()) {
        return; // Si falla la validación, no continuar
    }

    // Formatea los datos para el endpoint
    const data = {
        pcom_id: 1, 
        inf_edad_desde: edadDesde.value || null,
        inf_edad_hasta: edadHasta.value || null,
        inf_genero: genero.value || null,
        inf_estado_civil: estadoCivil.value || null,
        inf_ciudad_cargo: ciudades.value || null,
        inf_capacidad_reubicacion: reubicacion.value || null,
        inf_candidatos_discapacidad: discapacidad.value || null,
        inf_edad_excluyente: excluyentesDesdeHasta.value ? 1 : 0,
        inf_estado_civil_excluyente: excluyentesEstadoCivil.value ? 1 : 0,
        inf_genero_excluyente: excluyentesGenero.value ? 1 : 0,
        inf_capacidad_reubicacion_excluyente: excluyentesReubicacion.value ? 1 : 0,
        inf_candidatos_discapacidad_excluyente: excluyentesDiscapacidad.value ? 1 : 0,
        inf_ciudad_cargo_excluyente: excluyentesCiudad.value ? 1 : 0
    };

    try {
        await guardarInfoPersonalMutation.mutateAsync(data);
        console.log("Información personal guardada correctamente");

    } catch (error) {
        console.error("Error al guardar la información personal:", error);
        mensajeError.value = "Hubo un error al guardar la información. Intente nuevamente.";
    }
};


onMounted(() => {
    fetchEstadoCivilOptions();
    fetchGeneroOptions();
    fetchReubicacionOptions();
    fetchDiscapacidadOptions();
    fetchCiudadesOptions();
    console.log("ID del currículum recibido:", curriculumId);
});

</script>