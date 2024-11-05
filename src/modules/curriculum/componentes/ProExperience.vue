<template>
    <div class="mb-4">
            <div class="flex items-center justify-between bg-gray-200 p-4 rounded-t-lg">
              <h2 class="text-lg font-bold"><i class="fas fa-briefcase"></i> Experiencia profesional</h2>
              <span class="transition-transform">
                <!-- Toggle Switch -->
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="professionalExperienceActive" class="sr-only" />
                  <div class="relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
                    :class="{ 'bg-blue-500': professionalExperienceActive, 'bg-gray-300': !professionalExperienceActive }">
                    <span
                      class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out"
                      :class="{
                        'translate-x-6 bg-white': professionalExperienceActive,
                        'bg-neutral-400': !professionalExperienceActive
                      }"></span>
                  </div>
                </label>
              </span>
            </div>
            <div v-if="professionalExperienceActive" class="p-4 border border-t-0 rounded-b-lg">
              <form>
                <!-- Nombre del Cargo -->
                <div class="mb-4">
                  <label for="cargo" class="block text-gray-700 text-sm font-bold mb-2">Nombre del cargo</label>
                  <input v-model="cargo" type="text" id="cargo" placeholder="Ingresa el nombre del cargo" required
                    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Años de experiencia -->
                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="experienceYearsDesde" class="block text-gray-700 text-sm font-bold mb-2">Desde</label>
                    <input v-model="experienceYearsDesde" type="number" id="experienceYearsDesde" required
                      placeholder="Inserta el valor mínimo de años de experiencia requeridos"
                      class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label for="experienceYearsHasta" class="block text-gray-700 text-sm font-bold mb-2">Hasta</label>
                    <input v-model="experienceYearsHasta" type="number" id="experienceYearsHasta" required
                      placeholder="Inserta el valor máximo de años de experiencia requeridos"
                      class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <!-- Áreas / Departamentos en la Empresa -->
                <div class="mb-4">
                  <label for="department" class="block text-gray-700 text-sm font-bold mb-2">Áreas / Departamentos en
                    la
                    Empresa</label>
                  <input v-model="department" type="text" id="department" required
                    placeholder="Selecciona el área o departamento"
                    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Sub Áreas Laborales -->
                <AreaLaboralModal />
              </form>

              <div class="mt-4 text-center">
                <button @click="mostrarMasExperiencia" type="button"
                  class="text-blue-500 hover:text-blue-700 focus:outline-none">
                  Ver más <span v-if="!mostrarDetalleExperiencia">▼</span><span v-else>▲</span>
                </button>
              </div>

              <!-- Sección adicional que se muestra al hacer clic en "Ver más" -->
              <div v-if="mostrarDetalleExperiencia" class="mt-4">
                <!-- Agrega aquí el contenido adicional que se debe mostrar al hacer clic en "Ver más" -->

                <!-- Institucion Laboral -->
                <InstitucionLaboral />

                <div class="bg-red-100 border border-red-300 p-4 rounded-lg mb-6 mt-4">
                  <h4 class="text-red-500 font-bold mb-2">Campos Excluyentes</h4>
                  <p class="text-sm text-red-500 mb-4">Advertencia: selecciona los campos que son indispensables para
                    el
                    perfil. Ten en cuenta que si un candidato no cumple con un campo excluyente será descartado del
                    proceso.
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <label class="inline-flex items-center">
                      <input type="checkbox" v-model="excluyentesExperiencia" value="experiencia" 
                        class="form-checkbox text-red-500">
                      <span class="ml-2">Experiencia</span>
                    </label>
                    <!-- Agrega otros campos excluyentes si es necesario -->
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>
<script setup>
import { ref } from 'vue';

import AreaLaboralModal from '@/modules/curriculum/componentes/AreaLaboralModal.vue';
import InstitucionLaboral from '../componentes/InstitucionLaboral.vue';

const professionalExperienceActive = ref(false);
const cargo = ref("");
const experienceYearsDesde = ref("");
const experienceYearsHasta = ref("");
const department = ref("");
const excluyentesExperiencia = ref([]);

const mostrarDetalleExperiencia = ref(false);

const mostrarMasExperiencia = () => {
  mostrarDetalleExperiencia.value = !mostrarDetalleExperiencia.value;
};


</script>