<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">Configuración Avanzada</h2>

      <!-- Porcentaje total -->
      <div class="mb-4">
        <p class="text-gray-600">Ajusta la importancia de las secciones. Total: <span class="font-semibold">{{
            totalPercentage }}%</span></p>
      </div>

      <div class="space-y-4">
        <!-- Slider para cada configuración -->
        <div v-for="(item, index) in settings" :key="index" class="flex items-center justify-between">
          <span>{{ item.label }}</span>
          <input type="range" v-model.number="item.value" @input="updateTotalPercentage()" min="0" max="100"
            class="slider">
          <span>{{ item.value }}%</span>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button @click="handleClose" class="bg-gray-500 text-white px-4 py-2 rounded-lg" type="button">Cancelar</button>
        <button @click="handleSave" class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" type="button"
          :disabled="!isSaveEnabled" :class="{ 'bg-blue-300 cursor-not-allowed': !isSaveEnabled }">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from 'vue';

// Recibe las propiedades desde el componente padre
const props = defineProps({
  isOpen: Boolean,
});

// Define eventos para emitir al componente padre
const emit = defineEmits(['close', 'save']);

// Configuración de los sliders
const settings = ref([
  { label: 'Información personal', value: 0 },
  { label: 'Salario', value: 4 },
  { label: 'Educación', value: 40 },
  { label: 'Experiencia profesional', value: 40 },
  { label: 'Idioma', value: 6 },
  { label: 'Habilidades / Conocimientos', value: 10 },
]);

// Calcula el porcentaje total
const totalPercentage = computed(() => {
  return settings.value.reduce((acc, curr) => acc + (curr.value || 0), 0);
});

// Verifica si el botón de guardar debe estar habilitado
const isSaveEnabled = computed(() => totalPercentage.value === 100);

// Actualiza el porcentaje total
const updateTotalPercentage = () => {
  // La propiedad computed `totalPercentage` se actualiza automáticamente
};

// Función para manejar el cierre del modal
const handleClose = () => {
  emit('close');
};


const handleSave = () => {
  emit('save', settings.value); 
  handleClose();
};


watch(settings, updateTotalPercentage, { deep: true });
</script>

<style scoped>
.slider {
  width: 60%;
}

/* Estilo para el botón deshabilitado */
button:disabled {
  background-color: #9CA3AF;
  /* Color gris para el botón deshabilitado */
  cursor: not-allowed;
}
</style>
