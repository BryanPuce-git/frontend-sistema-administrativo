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


          <PersonalInfoSection :id="Number(pcom_id)" @savePersonalInfo="handlePersonalInfoSave" />
          <SalarioSection :id="Number(pcom_id)" @saveSalario="handleSalarioSave" />
          <EducationSection :id="Number(pcom_id)" @saveEducation="handleEducationSave" />
          <ProExperience :id="Number(pcom_id)" @saveProExperience="handleProExperienceSave" />
          <LanguageSection @saveLanguages="handleLanguagesSave" />
          <SkillsKnowledge @saveSkills="handleSkillsSave" />
          <FilterQuestionsSection @saveFilters="handleFiltersSave" />

        </div>
      </div>
      <div class="flex justify-end mb-5 mr-5">
        <button type="button" @click="openModal"
          class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
          Guardar
        </button>
      </div>



    </form>

    <!-- Modal de configuración avanzada -->
    <AdvancedConfigModal :isOpen="isModalOpen" @close="handleCloseModal" @save="handleSaveCurriculum" />

  </DashboardLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import Swal from 'sweetalert2';  
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
import { useGuardarInfoPersonal } from '@/modules/curriculum/composables/useGuardarInfoPersonal';
import { useGuardarSalario } from '@/modules/curriculum/composables/useGuardarSalario';
import { useGuardarEducacion } from '@/modules/curriculum/composables/useGuardarEducacion';
import { useGuardarExperiencia } from '@/modules/curriculum/composables/useGuardarExperiencia';
import { useActualizarInfoPersonal } from '@/modules/curriculum/composables/useActualizarInfoPersonal';
import { useActualizarSalario } from '@/modules/curriculum/composables/useActualizarSalario';
import { useActualizarEducacion } from '@/modules/curriculum/composables/useActualizarEducacion';
import { useActualizarExperiencia } from '@/modules/curriculum/composables/useActualizarExperiencia';


const guardarInfoPersonal = useGuardarInfoPersonal();
const guardarSalario = useGuardarSalario();
const guardarEducacion = useGuardarEducacion();
const guardarExperiencia = useGuardarExperiencia();

const actualizarInfoPersonal = useActualizarInfoPersonal();
const actualizarSalario = useActualizarSalario();
const actualizarEducacion = useActualizarEducacion();
const actualizarExperiencia = useActualizarExperiencia();


const router = useRouter();
const route = useRoute();
const isModalOpen = ref(false);
const personalInfoData = ref(null);
const salarioData = ref(null);
const educationData = ref(null);
const experienceData = ref(null);
const languageData = ref(null);
const skillsData = ref(null);
const filtersData = ref(null);

const pcom_id = ref(route.params.id);


const openModal = () => {
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
};

const goBack = () => {
  const perfilId = usePerfilId();
  const Id = perfilId.idPerfil;
  router.push(`/perfil-settings/${Id}`);
};

const handlePersonalInfoSave = (data) => {
  console.log("Datos recibidos de PersonalInfoSection:", data);
  personalInfoData.value = data;
};

const handleSalarioSave = (data) => {
  console.log("Datos de salario recibidos:", data);
  salarioData.value = data;
};

const handleEducationSave = (data) => {
  console.log("Datos de educación recibidos:", data);
  educationData.value = data;
};

const handleProExperienceSave = (data) => {
  console.log("Datos de Experiencia recibidos:", data);
  experienceData.value = data;
};

const handleLanguagesSave = (data) => {
  languageData.value = data;
};

const handleSkillsSave = (data) => {
  skillsData.value = data;
};

const handleFiltersSave = (data) => {
  filtersData.value = data;
};

const handleSaveCurriculum = async (settings) => {
  console.log("Configuración recibida para guardar:", settings);

  if (!Array.isArray(settings)) {
    console.error("Se esperaba un array para settings:", settings);
    return;
  }

  const totalPercentage = settings.reduce((acc, curr) => acc + (curr.value || 0), 0);
  if (totalPercentage !== 100) {
    console.error("El total de porcentajes no suma 100:", totalPercentage);
    return;
  }

  // Verifica que todas las secciones necesarias estén completas
  if (!personalInfoData.value || !salarioData.value || !educationData.value || !experienceData.value) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todas las secciones antes de guardar.',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
    return;  // Salir de la función si alguna sección está vacía
  }

  try {
    const data = {
      personalInfo: personalInfoData.value,
      salario: salarioData.value,
      educacion: educationData.value,
      experiencia: experienceData.value,
      config: settings,
    };

    console.log("Datos consolidados para guardar o actualizar:", data);

    // Código para actualizar o guardar usando mutaciones
    if (data.personalInfo?.inf_id) {
      console.log("Actualizando información personal...");
      await actualizarInfoPersonal(data.personalInfo);
    } else {
      console.log("Guardando nueva información personal...");
      await guardarInfoPersonal(data.personalInfo);
    }

    // Similar para salario, educación y experiencia
    if (data.salario?.sal_id) {
      console.log("Actualizando salario...");
      await actualizarSalario(data.salario);
    } else {
      console.log("Guardando nuevo salario...");
      await guardarSalario(data.salario);
    }

    if (data.educacion?.edu_id) {
      console.log("Actualizando educación...");
      await actualizarEducacion(data.educacion);
    } else {
      console.log("Guardando nueva educación...");
      await guardarEducacion(data.educacion);
    }

    if (data.experiencia?.exp_id) {
      console.log("Actualizando experiencia...");
      await actualizarExperiencia(data.experiencia);
    } else {
      console.log("Guardando nueva experiencia...");
      await guardarExperiencia(data.experiencia);
    }

    console.log("Todos los datos han sido correctamente guardados o actualizados.");
    const perfilId = usePerfilId();
    const Id = perfilId.idPerfil;
    router.push(`/perfil-settings/${Id}`);
  } catch (error) {
    console.error("Error al guardar o actualizar el currículum:", error);
    Swal.fire({
      title: 'Error',
      text: 'Ha ocurrido un error durante el proceso. Inténtelo de nuevo.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
};

</script>
