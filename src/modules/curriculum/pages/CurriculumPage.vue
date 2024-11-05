<template>
  <DashboardLayout>
    <form @submit.prevent="openModal" action="/nueva-pagina" method="POST">

      <div class="relative min-h-screen">
        <div class="w-full bg-white shadow">
          <!-- Encabezado -->
          <div class="flex justify-between items-center p-4 border-b border-gray-200">
            <div class="flex items-center space-x-2">
              <button @click="goBack" class="mr-2 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 class="text-xl font-semibold text-gray-800">Configura el match perfecto de Currículum</h1>
            </div>
            <button class="text-blue-600 hover:text-blue-800 font-semibold hidden">
              Configuración avanzada
              <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Subtítulo -->
          <!-- <div class="px-4 py-2 border-b border-gray-200 bg-gray-50">
            <p class="text-sm text-gray-600">Edición del perfil - <span class="font-semibold">DESARROLLADOR DE
                SOFTWARE</span></p>
          </div> -->

          <!-- Contenido principal -->
          <div class="p-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 class="text-lg font-semibold text-blue-600">Configuración del CV</h2>
              <p class="text-sm text-gray-600 mt-2">
                Configura las secciones del CV para que Evaluar filtre los mejores talentos entre todos los candidatos
                de
                tu
                proceso.
              </p>
              <p class="text-sm text-gray-600 mt-2">
                Si crees que alguna sección no es útil para tu proceso, selecciona la opción <span
                  class="font-semibold">Deshabilitar Sección</span> con el switch.
              </p>
              <p class="text-xs text-gray-500 mt-2">
                * Nada de lo que configures en estos campos se le mostrará al candidato.
              </p>
            </div>
          </div>
        </div>

        <div class="mx-auto bg-white rounded-lg p-6">

          <!-- Información Personal -->

          <PersonalInfoSection />

          <!-- Salario -->

          <SalarioSection />

          <!-- Educación -->

          <EducationSection />

          <!-- Experiencia Profesional -->

          <ProExperience />

          <!-- Idiomas -->

          <LanguageSection />

          <!--  Habilidades / Conocimientos  -->

          <SkillsKnowledge />

          <!-- Preguntas Filtro -->

          <FilterQuestionsSection />

        </div>
      </div>
      <div class="flex justify-end  mb-5 mr-5">
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
          Guardar
        </button>
      </div>


    </form>

    <!-- Modal de configuración avanzada -->
    <AdvancedConfigModal :isOpen="isModalOpen" @close="closeModal" @save="handleSave" />

  </DashboardLayout>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { ref } from 'vue';

import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import PersonalInfoSection from '@/modules/curriculum/componentes/PersonalInfoSection.vue';
import SalarioSection from '../componentes/SalarioSection.vue';
import EducationSection from '../componentes/EducationSection.vue';
import ProExperience from '../componentes/ProExperience.vue';
import LanguageSection from '../componentes/LanguageSection.vue';
import SkillsKnowledge from '../componentes/SkillsKnowledge.vue';
import FilterQuestionsSection from '../componentes/FilterQuestionsSection.vue';
import AdvancedConfigModal from '../componentes/AdvancedConfigModal.vue';
import { usePerfilId } from '@/stores/use-perfil-Id.store';

// Save Button

const router = useRouter();
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSave = (settings) => {
  console.log(settings); // Manejar los settings si es necesario
  closeModal();
  router.push('/perfil-settings');
};


const goBack = () => {
  const perfilId = usePerfilId();
  const Id = perfilId.idPerfil;
  router.push(`/perfil-settings/${Id}`);
};

</script>
