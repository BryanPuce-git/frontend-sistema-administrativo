import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const usePerfilId = defineStore('perfil-Id', () => {
  // Cargar el idPerfil de localStorage al iniciar el store
  const idPerfil = ref<number | null>(Number(localStorage.getItem('idPerfil')) || null);

  const setPerfil = (id: number) => {
    idPerfil.value = id;
  };

  // Usar watch para almacenar el idPerfil en localStorage cuando cambia
  watch(idPerfil, (newId) => {
    if (newId !== null) {
      localStorage.setItem('idPerfil', String(newId)); // Almacena en localStorage
    } else {
      localStorage.removeItem('idPerfil'); // Elimina el valor si es null
    }
  });

  const clearPerfil = () => {
    idPerfil.value = null;
    localStorage.removeItem('idPerfil'); // Limpia de localStorage
  };

  // Y expórtala
  return {
    idPerfil,
    setPerfil,
    clearPerfil,
  };
});
