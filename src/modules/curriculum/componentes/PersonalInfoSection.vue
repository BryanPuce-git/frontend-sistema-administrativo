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
                            :class="{ 'translate-x-6 bg-white': personalInfoActive, 'bg-neutral-400': !personalInfoActive }"></span>
                    </div>
                </label>
            </span>
        </div>

        <div v-if="personalInfoActive" class="p-4 border border-t-0 rounded-b-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <!-- Edad -->
                <div>
                    <label for="edad-desde" class="block text-gray-700 text-sm font-bold mb-2">Edad Desde</label>
                    <input v-model="edadDesde" type="number" id="edad-desde" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Inserta edad mínima requerida" />
                    <label for="edad-hasta" class="block text-gray-700 text-sm font-bold mb-2">Edad Hasta</label>
                    <input v-model="edadHasta" type="number" id="edad-hasta" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Inserta edad máxima requerida" />
                    <!-- Mensaje de advertencia para Edad -->
                    <p v-if="excluyentesDesdeHasta && (!edadDesde || !edadHasta)" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>

                <!-- Género -->
                <div>
                    <label for="genero" class="block text-gray-700 text-sm font-bold mb-2">Selecciona el género
                        requerido</label>
                    <select id="genero" required v-model="generoId"
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in generoOptions" :key="item.Id" :value="item.Id">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                    <!-- Mensaje de advertencia para Género -->
                    <p v-if="excluyentesGenero && !generoId" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>

                <!-- Ciudad -->
                <div>
                    <label for="ciudad" class="block text-gray-700 text-sm font-bold mb-2">Selecciona la(s) ciudad(es)
                        donde dispones del cargo</label>
                    <select id="ciudad" v-model="ciudadId" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in ciudadesOptions" :key="item.Id" :value="item.Id">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                    <!-- Mensaje de advertencia para Ciudad -->
                    <p v-if="excluyentesCiudad && !ciudadId" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>

                <!-- Estado civil -->
                <div>
                    <label for="estado-civil" class="block text-gray-700 text-sm font-bold mb-2">Selecciona estado civil
                        requerido</label>
                    <select id="estado-civil" v-model="estadoCivilId" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in estadoCivilOptions" :key="item.Id" :value="item.Id">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                    <!-- Mensaje de advertencia para Estado civil -->
                    <p v-if="excluyentesEstadoCivil && !estadoCivilId" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>

                <!-- Capacidad de reubicación -->
                <div>
                    <label for="reubicacion" class="block text-gray-700 text-sm font-bold mb-2">¿Capacidad de
                        reubicación?</label>
                    <select id="reubicacion" v-model="reubicacionId" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in reubicacionOptions" :key="item.Id" :value="item.Id">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                    <!-- Mensaje de advertencia para Capacidad de reubicación -->
                    <p v-if="excluyentesReubicacion && !reubicacionId" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>

                <!-- Candidatos con discapacidad -->
                <div>
                    <label for="discapacidad" class="block text-gray-700 text-sm font-bold mb-2">¿Candidatos con
                        discapacidad?</label>
                    <select id="discapacidad" v-model="discapacidadId" required
                        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="item in discapacidadOptions" :key="item.Id" :value="item.Id">
                            {{ item['Item Nombre'] }}
                        </option>
                    </select>
                    <!-- Mensaje de advertencia para Candidatos con discapacidad -->
                    <p v-if="excluyentesDiscapacidad && !discapacidadId" class="text-red-500 text-sm mt-1">
                        Este campo es obligatorio debido a la selección excluyente.
                    </p>
                </div>
            </div>

            <!-- Campos Excluyentes -->
            <div class="bg-red-100 border border-red-300 p-4 rounded-lg mb-6">
                <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
                <p class="text-sm text-black-500 mb-4"><b>Advertencia: </b>selecciona los campos que son indispensables
                    para el perfil. Ten en cuenta que si un candidato no cumple con un campo excluyente será descartado
                    del proceso.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesDesdeHasta" value="edad"
                            class="form-checkbox text-red-500">
                        <span class="ml-2">Edad</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="checkbox" v-model="excluyentesGenero" value="genero"
                            class="form-checkbox text-red-500">
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
                        <input type="checkbox" v-model="excluyentesCiudad" value="ciudad"
                            class="form-checkbox text-red-500">
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
import { onMounted, ref, watch } from 'vue';
import { useConsultarCatalogo } from '@/modules/curriculum/composables/useConsultarCatalogo';
import { defineProps, defineEmits } from 'vue';
import { useApi } from '@/composables/use-api';


const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['savePersonalInfo']);

const personalInfoActive = ref(false);


// Rango de edad
const edadDesde = ref("");
const edadHasta = ref("");

// Género (mantiene tanto el ID como el nombre)
const generoId = ref(""); // ID del género seleccionado
const generoNombre = ref(""); // Nombre del género seleccionado

// Ciudad (mantiene tanto el ID como el nombre)
const ciudadId = ref(""); // ID de la ciudad seleccionada
const ciudadNombre = ref(""); // Nombre de la ciudad seleccionada

// Estado Civil (mantiene tanto el ID como el nombre)
const estadoCivilId = ref(""); // ID del estado civil seleccionado
const estadoCivilNombre = ref(""); // Nombre del estado civil seleccionado

// Capacidad de reubicación (mantiene tanto el ID como el nombre)
const reubicacionId = ref(""); // ID de la capacidad de reubicación seleccionada
const reubicacionNombre = ref(""); // Nombre de la capacidad de reubicación seleccionada

// Discapacidad (mantiene tanto el ID como el nombre)
const discapacidadId = ref(""); // ID de la discapacidad seleccionada
const discapacidadNombre = ref(""); // Nombre de la discapacidad seleccionada

// Campos excluyentes
const excluyentesDesdeHasta = ref(false);
const excluyentesEstadoCivil = ref(false);
const excluyentesGenero = ref(false);
const excluyentesCiudad = ref(false);
const excluyentesReubicacion = ref(false);
const excluyentesDiscapacidad = ref(false);

// Códigos de catálogo para consultas
const codigoCatalogoEstadoCivil = 'EST-CI';
const codigoCatalogoGenero = 'GEN';
const codigoCatalogoReubicacion = 'CAP-REU';
const codigoCatalogoDiscapacidad = 'DISCAP';
const codigoCatalogoCuidades = 'CIUD';

// Opciones para cada selección (listas de opciones)
const estadoCivilOptions = ref([]); // Lista de opciones para estado civil
const generoOptions = ref([]); // Lista de opciones para género
const reubicacionOptions = ref([]); // Lista de opciones para capacidad de reubicación
const discapacidadOptions = ref([]); // Lista de opciones para discapacidad
const ciudadesOptions = ref([]); // Lista de opciones para ciudades


watch(estadoCivilId, (newId) => {
    const selected = estadoCivilOptions.value.find(item => item.Id === newId);
    estadoCivilNombre.value = selected ? selected['Item Nombre'] : "";
});

watch(generoId, (newId) => {
    const selected = generoOptions.value.find(item => item.Id === newId);
    generoNombre.value = selected ? selected['Item Nombre'] : "";
});

watch(ciudadId, (newId) => {
    const selected = ciudadesOptions.value.find(item => item.Id === newId);
    ciudadNombre.value = selected ? selected['Item Nombre'] : "";
});

watch(reubicacionId, (newId) => {
    const selected = reubicacionOptions.value.find(item => item.Id === newId);
    reubicacionNombre.value = selected ? selected['Item Nombre'] : "";
});


watch(discapacidadId, (newId) => {
    const selected = discapacidadOptions.value.find(item => item.Id === newId);
    discapacidadNombre.value = selected ? selected['Item Nombre'] : "";
});




const consultarcatalogo = useConsultarCatalogo();

const fetchEstadoCivilOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoEstadoCivil);
        estadoCivilOptions.value = response;
        // console.log("Datos recibidos del estado civil:", response); 
    } catch (error) {
        // console.error("Error al consultar el catálogo de estado civil:", error);
    }
};

const fetchGeneroOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoGenero);
        generoOptions.value = response;
        // console.log("Datos recibidos del género:", response); 
    } catch (error) {
        // console.error("Error al consultar el catálogo de género:", error);
    }
};

const fetchReubicacionOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoReubicacion);
        reubicacionOptions.value = response;
        // console.log("Datos recibidos del reubicación:", response); 
    } catch (error) {
        // console.error("Error al consultar el catálogo de reubicación:", error);
    }
};

const fetchDiscapacidadOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoDiscapacidad);
        discapacidadOptions.value = response;
        // console.log("Datos recibidos del discapacidad", response); 
    } catch (error) {
        // console.error("Error al consultar el catálogo de discapacidad", error);
    }
};

const fetchCiudadesOptions = async () => {
    try {
        const response = await consultarcatalogo.mutateAsync(codigoCatalogoCuidades);
        ciudadesOptions.value = response;
        // console.log("Datos recibidos del cuidades", response); 
    } catch (error) {
        // console.error("Error al consultar el catálogo de cuidades", error);
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

const inf_id = ref(null);

const guardarInformacionPersonal = () => {
    console.log("Guardando información personal...");

    const data = {
        inf_id: inf_id.value || null, // Incluye el ID si existe
        pcom_id: props.id, // ID del perfil
        inf_edad_desde: edadDesde.value || null,
        inf_edad_hasta: edadHasta.value || null,
        inf_genero: generoId.value || null,
        inf_estado_civil: estadoCivilId.value || null,
        inf_ciudad_cargo: ciudadId.value || null,
        inf_capacidad_reubicacion: reubicacionId.value || null,
        inf_candidatos_discapacidad: discapacidadId.value || null,
        inf_edad_excluyente: excluyentesDesdeHasta.value ? 1 : 0,
        inf_estado_civil_excluyente: excluyentesEstadoCivil.value ? 1 : 0,
        inf_genero_excluyente: excluyentesGenero.value ? 1 : 0,
        inf_capacidad_reubicacion_excluyente: excluyentesReubicacion.value ? 1 : 0,
        inf_candidatos_discapacidad_excluyente: excluyentesDiscapacidad.value ? 1 : 0,
        inf_ciudad_cargo_excluyente: excluyentesCiudad.value ? 1 : 0,
    };

    console.log("Datos de información personal para enviar:", data);

    // Emitir los datos al componente principal (Curriculum)
    emit("savePersonalInfo", data);
};


watch(
  [
    inf_id, // Si inf_id cambia, se puede reaccionar (por ejemplo, cuando se obtiene desde la API)
    edadDesde,
    edadHasta,
    generoId,
    estadoCivilId,
    ciudadId,
    reubicacionId,
    discapacidadId,
    excluyentesDesdeHasta,
    excluyentesEstadoCivil,
    excluyentesGenero,
    excluyentesCiudad,
    excluyentesReubicacion,
    excluyentesDiscapacidad,
  ],
  () => {
    guardarInformacionPersonal(); // Llamar al método para emitir los datos al componente principal
  },
  { deep: true } // Observar cambios profundos en los objetos
);


const obtenerInformacionPersonal = async () => {
    try {
        const response = await useApi.get(`/api/v1/curriculum/informacion-personal/${props.id}`);
        console.log("Respuesta completa de la API:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
            const data = response.data[0]; // Primer elemento del array

            // Asigna los valores obtenidos
            inf_id.value = data.inf_id || null; // Guardar inf_id para futuras actualizaciones
            edadDesde.value = data.inf_edad_desde;
            edadHasta.value = data.inf_edad_hasta;
            generoId.value = data.inf_genero;
            estadoCivilId.value = data.inf_estado_civil;
            ciudadId.value = data.inf_ciudad_cargo;
            reubicacionId.value = data.inf_capacidad_reubicacion;
            discapacidadId.value = data.inf_candidatos_discapacidad;
            excluyentesDesdeHasta.value = data.inf_edad_excluyente === 1;
            excluyentesEstadoCivil.value = data.inf_estado_civil_excluyente === 1;
            excluyentesGenero.value = data.inf_genero_excluyente === 1;
            excluyentesCiudad.value = data.inf_ciudad_cargo_excluyente === 1;
            excluyentesReubicacion.value = data.inf_capacidad_reubicacion_excluyente === 1;
            excluyentesDiscapacidad.value = data.inf_candidatos_discapacidad_excluyente === 1;

            console.log("Datos de información personal después de asignar:", {
                inf_id: inf_id.value,
                edadDesde: edadDesde.value,
                edadHasta: edadHasta.value,
                generoId: generoId.value,
                estadoCivilId: estadoCivilId.value,
                ciudadId: ciudadId.value,
                reubicacionId: reubicacionId.value,
                discapacidadId: discapacidadId.value,
            });
        } else {
            console.warn("No se encontraron datos de información personal para este perfil.");
        }
    } catch (error) {
        console.error("Error al obtener la información personal:", error);
    }
};



onMounted(async () => {
    await Promise.all([
        fetchEstadoCivilOptions(),
        fetchGeneroOptions(),
        fetchReubicacionOptions(),
        fetchDiscapacidadOptions(),
        fetchCiudadesOptions()
    ]);
    obtenerInformacionPersonal();
});

</script>