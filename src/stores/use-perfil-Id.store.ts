import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePerfilId = defineStore('perfil-Id', () => {
  const idPerfil = ref<number>();

  const setPerfil = (id: number) => {
    idPerfil.value = id;
  };

  return {
    idPerfil,
    setPerfil,
  };
});
