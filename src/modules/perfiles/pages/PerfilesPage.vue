<template>
    <DashboardLayout>
        <div class="w-full h-full bg-white  rounded-lg p-6">
            <!-- Título y subtítulo -->
            <div class="mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Listado de perfiles</h2>
                <p class="text-gray-600">Aquí puedes elegir los perfiles existentes y editarlos.</p>
            </div>

            <!-- Filtro de estado -->
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <div class="w-full sm:w-1/3">
                    <select
                        class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Todos los estados</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
                <div class="flex space-x-2">
                    <button class="p-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button class="p-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </div>

            <div v-for="perfil in perfiles" :key="perfil.perf_id"
                class="border border-gray-200 p-4 mb-2 rounded-lg shadow hover:bg-gray-200 transition-colors duration-300"
                @click="irAPerfilSettings(perfil.perf_id)">
                <div class="flex justify-between items-center">
                    <div>
                        <!-- Estado del perfil y Fecha de modificación -->
                        <div class="flex items-center space-x-2">
                            <!-- Estado del perfil -->
                            <span class="text-xs"
                                :class="{ 'text-green-500': perfil.Estado === 'Activo', 'text-red-500': perfil.Estado === 'Activo' }">
                                {{ perfil.Estado === 'Activo' ? 'Activo' : 'Inactivo' }}
                            </span>
                            <!-- Fecha de modificación al lado del estado -->
                            <span class="text-xs text-gray-500">
                                {{ perfil.Fecha }}
                            </span>
                        </div>

                        <!-- Nombre del perfil -->
                        <p class="font-semibold text-gray-800">{{ perfil.Perfil }}</p>
                    </div>

                    <!-- Botones de Editar y Borrar -->
                    <div class="flex">
                        <button @click.stop="abrirModalEditar(perfil)" class="text-gray-600 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 12h12m-6-6v12" />
                            </svg>
                        </button>
                        <button @click.stop="borrarPerfil(perfil.perf_id)"
                            class="text-gray-600 hover:text-gray-900 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Estado, Nivel, y Componentes del perfil -->
                <p class="text-sm text-gray-600">
                    Estado: {{ perfil.Estado === 'Activo' ? 'Activo' : 'Inactivo' }} | Nivel: {{
                        perfil.Dificultad }} | Componentes: {{ perfil.Componente }}
                </p>

                <!-- Descripción genérica para el rol -->
                <p class="text-sm text-gray-600 mt-2">
                    Aquí puedes poner una descripción de los requisitos y responsabilidades del perfil.
                </p>
            </div>




            <!-- Botón verde de añadir perfil -->
            <button @click="abrirModal"
                class="fixed bottom-4 right-4 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <!-- Modal -->
            <div v-if="mostrarModal" class="fixed inset-0 z-50 overflow-y-auto" @click="cerrarModal">
                <div class="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <!-- Centrado del modal -->
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-3xl"
                        @click.stop>
                        <form @submit.prevent="guardar">
                            <div class="bg-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
                                <div class="sm:flex sm:items-start">
                                    <div class="w-full text-center sm:text-left">
                                        <!-- Título del modal -->
                                        <h3 class="text-2xl font-semibold text-gray-900 leading-tight mb-4">Crear Perfil
                                        </h3>

                                        <!-- Contenido desplazable -->
                                        <div class="overflow-y-auto" style="max-height: 400px;">

                                            <!-- Formulario dentro del modal -->
                                            <div class="mb-6">
                                                <label for="nombre"
                                                    class="block text-gray-700 text-sm font-bold mb-2">Nombre del
                                                    Perfil</label>
                                                <input v-model="nombre" type="text" id="nombre" @input="limitarLetras"
                                                    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Ej. Analista de Talento Humano" />
                                                <div class="text-right text-sm text-gray-500 mt-1">{{ contarCaracteres
                                                    }} / 150</div>
                                                <p v-if="mensajeError" class="text-red-500 text-sm mt-1">{{ mensajeError
                                                    }}</p>
                                            </div>

                                            <!-- Opciones de nivel -->
                                            <div class="mb-8">
                                                <h4 class="text-lg font-semibold text-gray-800 mb-4">Nivel</h4>
                                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <div
                                                        class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                                        <input type="radio" v-model="nivel" value="Alto"
                                                            class="form-radio text-blue-500 mr-4 mt-1">
                                                        <div class="flex-grow">
                                                            <span class="block font-medium text-gray-800">Alto</span>
                                                            <p class="text-sm text-gray-600 mt-1">Jefes, Presidentes,
                                                                Directores. Nivel de mayor autoridad.</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                                        <input type="radio" v-model="nivel" value="Medio"
                                                            class="form-radio text-blue-500 mr-4 mt-1">
                                                        <div class="flex-grow">
                                                            <span class="block font-medium text-gray-800">Medio</span>
                                                            <p class="text-sm text-gray-600 mt-1">Supervisores,
                                                                Coordinadores. Gestión intermedia.</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                                        <input type="radio" v-model="nivel" value="Bajo"
                                                            class="form-radio text-blue-500 mr-4 mt-1">
                                                        <div class="flex-grow">
                                                            <span class="block font-medium text-gray-800">Bajo</span>
                                                            <p class="text-sm text-gray-600 mt-1">Operativos, Técnicos.
                                                                Nivel de trabajo práctico y especializado.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Componente dinámico para los componentes del perfil -->
                                            <div>
                                                <h4 class="text-lg font-semibold text-gray-800 mb-4">Componentes</h4>
                                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <label v-for="componente in componentes" :key="componente.Id"
                                                        class="flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 ease-in-out">
                                                        <input type="checkbox" v-model="opciones"
                                                            :value="componente['Item Código']"
                                                            class="form-checkbox text-orange-500 mr-3" />
                                                        <span class="text-gray-800">{{ componente['Item Nombre']
                                                            }}</span> <!-- Mostramos el 'Item Nombre' -->
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="submit"
                                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Guardar Perfil
                                </button>
                                <button @click="cerrarModal" type="button"
                                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal de Edición de Perfil -->
        <div v-if="mostrarModalEditar" class="fixed inset-0 z-50 overflow-y-auto" @click="cerrarModalEditar">
            <div class="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-3xl"
                    @click.stop>
                    <form @submit.prevent="guardarEdicion">
                        <div class="bg-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto max-h-[80vh] overflow-y-auto">
                            <div class="sm:flex sm:items-start">
                                <div class="w-full text-center sm:text-left">
                                    <h3 class="text-2xl font-semibold text-gray-900 leading-tight mb-4">Editar Perfil
                                    </h3>

                                    <!-- Formulario dentro del modal -->
                                    <div class="mb-6">
                                        <label for="nombre-editar"
                                            class="block text-gray-700 text-sm font-bold mb-2">Nombre del Perfil</label>
                                        <input v-model="nombreEditar" type="text" id="nombre-editar"
                                            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Ej. Analista de Talento Humano" />
                                    </div>

                                    <!-- Opciones de nivel -->
                                    <div class="mb-8">
                                        <h4 class="text-lg font-semibold text-gray-800 mb-4">Nivel</h4>
                                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div
                                                class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                                <input type="radio" v-model="nivelEditar" value="Alto"
                                                    class="form-radio text-blue-500 mr-4 mt-1">
                                                <div class="flex-grow">
                                                    <span class="block font-medium text-gray-800">Alto</span>
                                                    <p class="text-sm text-gray-600 mt-1">Jefes, Presidentes,
                                                        Directores. Nivel de mayor autoridad.</p>
                                                </div>
                                            </div>
                                            <div
                                                class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                                <input type="radio" v-model="nivelEditar" value="Medio"
                                                    class="form-radio text-blue-500 mr-4 mt-1">
                                                <div class="flex-grow">
                                                    <span class="block font-medium text-gray-800">Medio</span>
                                                    <p class="text-sm text-gray-600 mt-1">Supervisores, Coordinadores.
                                                        Gestión intermedia.</p>
                                                </div>
                                            </div>
                                            <div
                                                class="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                                <input type="radio" v-model="nivelEditar" value="Bajo"
                                                    class="form-radio text-blue-500 mr-4 mt-1">
                                                <div class="flex-grow">
                                                    <span class="block font-medium text-gray-800">Bajo</span>
                                                    <p class="text-sm text-gray-600 mt-1">Operativos, Técnicos. Nivel de
                                                        trabajo práctico y especializado.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Componente dinámico para los componentes del perfil -->
                                    <div>
                                        <h4 class="text-lg font-semibold text-gray-800 mb-4">Componentes</h4>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <label v-for="componente in componentes" :key="componente.Id"
                                                class="flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 ease-in-out">
                                                <input type="checkbox" v-model="opcionesEditar"
                                                    :value="componente['Item Nombre']"
                                                    class="form-checkbox text-orange-500 mr-3" />
                                                <span class="text-gray-800">{{ componente['Item Nombre'] }}</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Actualizar Perfil
                            </button>
                            <button @click="cerrarModalEditar" type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { usePerfilStore } from '@/stores/use-perfil.store';
import Swal from 'sweetalert2';
import { useGuardarPerfil } from '@/modules/perfiles/composables/customDataTableAgregarPerfilesModal';
import { useApi } from '@/composables/use-api';
// import type { PerfilResponse } from '@/modules/perfiles/dto/PerfilResponseGet';
import { useConsultarItemCatalogo } from '@/modules/perfiles/composables/customDataTableComponentsResponse';
import { useCrearPerfilComponente } from '@/modules/perfiles/composables/CrearPerfilYComponentes';
import type { PerfilComponenteResponse } from '../dto/PerfilComponenteResponse.dto';
import type { ItemCatalogo } from '@/modules/perfiles/dto/itemCatalogo.dto';
import { watch } from 'vue';


onMounted(async () => {
    await obtenerPerfiles();
    cargarComponentes(); // Llama a la función al montar el componente
});

const irAPerfilSettings = (perfilId: number) => {
    router.push(`/perfil-settings/${perfilId}`);
};

const router = useRouter();
const guardarPerfil = useGuardarPerfil();
const crearPerfilyComponente = useCrearPerfilComponente();
const mostrarModal = ref(false);
const nombre = ref('');
const nivel = ref('');
// const perfilActual = ref<PerfilResponse | null>(null);
const opciones = ref<string[]>([]);
const mensajeError = ref('');
const perfilStore = usePerfilStore();
const perfiles = ref<PerfilComponenteResponse[]>([]);


//Constantes del modal editar
const idPerfil = ref<number>(0);
const opcionesEditar = ref<string[]>([]);
const mostrarModalEditar = ref(false);
const nombreEditar = ref('');
const nivelEditar = ref('');


//Constantes para traer los componentes desde el endpoint
const query = useConsultarItemCatalogo();
const catalogoCodigo = 'COMP';
const componentes = ref<ItemCatalogo[]>([]);


//Guardando en el store
perfilStore.setPerfil(nombre.value, nivel.value, opciones.value);
console.log("Opciones en el store", opciones.value)




const obtenerPerfiles = async () => {
    const usuarioId = localStorage.getItem('usuarioId');
    const estado = '1';

    if (!usuarioId) {
        console.error('No se encontró el ID de usuario');
        return;
    }

    try {
        // console.log('Llamando a la API para obtener perfiles del usuario:', usuarioId);

        const response = await useApi.get(`/api/v1/perfiles_usuario/${usuarioId}/${estado}`);
        // console.log('Respuesta de la API:', response.data);

        // Verifica que la respuesta sea un array
        if (!Array.isArray(response.data)) {
            console.error('La respuesta de la API no es un array:', response.data);
            return;
        }

        // Mapea la respuesta de la API a la estructura de tu interfaz PerfilResponse
        perfiles.value = response.data.map((perfil: any) => {
            // Validaciones básicas antes de mapear los campos
            const perfId = perfil.perf_id ?? null; // Usa perfil.perf_id en lugar de perfil.Id

            if (!perfId) {
                console.warn('Perfil con ID no válido encontrado:', perfil);
            }

            return {
                pcom_id: perfil.pcom_id ?? null, // ID del componente
                perf_id: perfil.perf_id ?? null, // ID del perfil
                Perfil: perfil.Perfil || 'Nombre no disponible', // Nombre del perfil
                Estado: perfil.Estado || 'Estado no disponible', // Estado del perfil
                Dificultad: perfil.Dificultad || 'Dificultad no disponible', // Nivel de dificultad
                Fecha: perfil.Fecha || 'Fecha no disponible', // Fecha de actualización o creación
                Componente: perfil.Componente || 'Componente no disponible', // Componentes asociados al perfil
                Anuncio: perfil.Anuncio || 'Anuncio no disponible' // Descripción del anuncio asociado
            };
        });

        // console.log('Perfiles obtenidos después de mapear:', perfiles.value);

    } catch (error) {
        console.error('Error al obtener los perfiles:', error);
    }
};






const contarCaracteres = computed(() => {
    return nombre.value.length;
});

const limitarLetras = () => {
    if (nombre.value.length > 150) {
        nombre.value = nombre.value.slice(0, 150);
    }
};

const abrirModal = () => {
    mostrarModal.value = true;

};

const cerrarModal = () => {
    mostrarModal.value = false;
};

const guardar = async () => {
    const usuarioId = localStorage.getItem('usuarioId');

    console.log('Guardando edición...'); // Para verificar que la función se está llamando
    console.log('ID de Perfil:', idPerfil.value); // Verifica que el ID esté definido
    console.log('Nombre guardado:', nombreEditar.value);
    console.log('Nivel guardado:', nivelEditar.value);

    // Obtener los IDs de los componentes seleccionados
    const idsComponentesGuardados = opciones.value.map(codigo => {
        const componente = componentes.value.find(comp => comp['Item Código'] === codigo);
        return componente ? componente.Id : null; // Si encuentra el componente, devuelve su ID; si no, devuelve null
    });

    console.log('Componentes guardados (IDs):', idsComponentesGuardados);
    console.log('Id usuario:', usuarioId);

    // Validaciones
    if (!nombre.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del perfil es obligatorio.',
        });
        return;
    }

    if (!nivel.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes seleccionar un nivel.',
        });
        return;
    }

    if (opciones.value.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes seleccionar al menos una opción.',
        });
        return;
    }

    // Preparar datos para el perfil
    const perfilDto = {
        perf_nombre: nombre.value,
        perf_nivel_contribucion: nivel.value,
        usu_id: Number(usuarioId), // Cambia este valor con el ID del usuario real
    };

    try {
        // Llamar la mutación para guardar el perfil
        const perfilCreado = await guardarPerfil.mutateAsync(perfilDto);

        // Asegúrate de que la respuesta tenga el ID correcto
        const perfilId = perfilCreado.perf_id; // Cambia esto según la estructura de tu respuesta

        // Verificar que perfilId se ha recibido correctamente
        if (!perfilId) {
            throw new Error('El ID del perfil no se ha recibido correctamente.');
        }

        // Crear el mapeo de componentes
        const componenteMapping = {
            "Disc": idsComponentesGuardados.find(id => id === 1) || 0,
            "Curricul": idsComponentesGuardados.find(id => id === 2) || 0,
            "Conoc": idsComponentesGuardados.find(id => id === 3) || 0,
            "Comp": idsComponentesGuardados.find(id => id === 4) || 0,
            "Vide": idsComponentesGuardados.find(id => id === 5) || 0
        };

        // Crear el objeto para los componentes
        const perfilComponenteDto = {
            perf_id: perfilId,
            disc_id: componenteMapping["Disc"],
            curr_id: componenteMapping["Curricul"],
            cono_id: componenteMapping["Conoc"],
            comp_id: componenteMapping["Comp"],
            vide_id: componenteMapping["Vide"],
            pcom_anuncio: "Colocar aquí el anuncio del perfil en cuestión"
        };

        console.log('Datos del componente a enviar:', perfilComponenteDto); // Verifica los datos

        // Llamar la mutación para crear el perfil-componente
        await crearPerfilyComponente.mutateAsync(perfilComponenteDto);

        Swal.fire({
            icon: 'success',
            title: 'Perfil Guardado',
            text: 'El perfil se ha guardado correctamente.',
        });

        cerrarModal();

        setTimeout(() => {
            router.replace('/perfil-settings');
        }, 100);
    } catch (error) {
        console.error('Error guardando el perfil:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el perfil. Inténtalo de nuevo más tarde.',
        });
    }
};



const abrirModalEditar = (perfil: PerfilComponenteResponse) => {
    idPerfil.value = perfil.perf_id;
    mostrarModalEditar.value = true;
    nombreEditar.value = perfil.Perfil;
    nivelEditar.value = perfil.Dificultad;

    // Asignar y dividir los componentes, conviértelos a mayúsculas
    opcionesEditar.value = perfil.Componente.split(',').map(item => item.trim().toUpperCase());

    console.log('Opciones para editar (opcionesEditar):', opcionesEditar.value);


};



// Función para cerrar el modal de edición
const cerrarModalEditar = () => {
    mostrarModalEditar.value = false;
};


const guardarEdicion = async () => {
    const usuarioId = localStorage.getItem('usuarioId');

    console.log('Guardando edición...'); // Para verificar que la función se está llamando
    console.log('ID de Perfil:', idPerfil.value); // Verifica que el ID esté definido
    console.log('Nombre Editar:', nombreEditar.value);
    console.log('Nivel Editar:', nivelEditar.value);

    const response = await useApi.get('/api/v1/item-catalogo/COMP');
    const allComponents: ItemCatalogo[] = response.data; // Especificamos que el tipo es un array de Componente
    const allComponentIds = allComponents.map((comp: ItemCatalogo) => comp.Id);
    console.log('IDs de todos los componentes obtenidos:', allComponentIds);

    // Obtener los IDs de los componentes seleccionados
    const idsComponentesGuardados = opcionesEditar.value.map(nombre => {
        const componente = componentes.value.find(comp => comp['Item Nombre'] === nombre); // Cambié 'Item Código' a 'Item Nombre'
        return componente ? componente.Id : null; // Si encuentra el componente, devuelve su ID; si no, devuelve null
    }).filter(id => id !== null); // Filtrar nulls para obtener solo los IDs válidos

    console.log('Componentes guardados (IDs):', idsComponentesGuardados);

    console.log('Id usuario:', usuarioId);

    // Validaciones similares a las de guardar
    if (!nombreEditar.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del perfil es obligatorio.',
        });
        return;
    }

    if (!nivelEditar.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes seleccionar un nivel.',
        });
        return;
    }

    if (opcionesEditar.value.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes seleccionar al menos una opción.',
        });
        return;
    }

    // Cuerpo de la solicitud, enviando solo los campos que deseas actualizar
    const perfilDto = {
        perf_nombre: nombreEditar.value,
        perf_nivel_contribucion: nivelEditar.value,
        usu_id: Number(usuarioId),
        // Agregando los IDs de los componentes seleccionados
        // Agrega otros campos si es necesario
    };

    try {
        // Cambiar aquí a PATCH
        await useApi.patch(`/api/v1/perfiles/${idPerfil.value}`, perfilDto);



        for (const idComp of allComponentIds) {
            const isSelected = idsComponentesGuardados.includes(idComp);
            const valor = isSelected ? idComp : 0; // Si está seleccionado, usa su ID; si no, usa 0

            // Llama a la API para actualizar el componente
            await useApi.patch(`/api/v1/Perfiles-Componentes/${idPerfil.value}/${idComp}/${valor}`);
        }
 
        Swal.fire({
            icon: 'success',
            title: 'Perfil Actualizado',
            text: 'El perfil se actualizó correctamente.',
        });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error); // Para ver más detalles del error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el perfil. Intenta nuevamente.',
        });
    } finally {
        cerrarModalEditar(); // Cierra el modal
        obtenerPerfiles();
    }
};


const borrarPerfil = async (perfilId: number): Promise<void> => {
    try {
        await useApi.delete(`/api/v1/perfiles/${perfilId}`);
        perfiles.value = perfiles.value.filter(p => p.perf_id !== perfilId);
        Swal.fire('Perfil eliminado', 'El perfil ha sido eliminado correctamente', 'success');
    } catch (error) {
        console.error('Error eliminando el perfil:', error);
        Swal.fire('Error', 'No se pudo eliminar el perfil', 'error');
    }
};


const cargarComponentes = async () => {
    try {
        // Llama a la función mutateAsync para obtener los componentes
        const response = await query.mutateAsync(catalogoCodigo);

        // Guarda los componentes en la variable
        componentes.value = response;

        // Imprime los nombres de los componentes
        console.log('Componentes cargados:', componentes.value.map(comp => comp['Item Nombre']));

        // Imprime los IDs y nombres de los componentes
        console.log('IDs y nombres de los componentes:');
        componentes.value.forEach(comp => {
            console.log(`ID: ${comp['Id']}, Nombre: ${comp['Item Nombre']}`);
        });

    } catch (error) {
        console.error('Error al cargar los componentes del catálogo:', error);
    }
};




// const resetearSeleccion = () => {
//     opcionesEditar.value = [];  // Limpia las opciones seleccionadas
// };

// watch(
//     mostrarModalEditar, // Esta es la propiedad que estamos observando
//     (nuevoValor) => { // Este es el callback que se ejecutará al cambiar
//         if (nuevoValor) {
//             resetearSeleccion(); // Cuando el modal se abre, limpia las opciones seleccionadas
//         }
//     }
// );

</script>
