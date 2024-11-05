import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePerfilStore = defineStore('perfil', () => {
  const nombre = ref('');
  const nivel = ref('');
  const opciones = ref<string[]>([]);

  const setPerfil = (nuevoNombre: string, nuevoNivel: string, nuevasOpciones: string[]) => {
    nombre.value = nuevoNombre;
    nivel.value = nuevoNivel;
    opciones.value = nuevasOpciones;
  };

  return {
    nombre,
    nivel,
    opciones,
    setPerfil
  };
});

// use-perfil.store.ts

// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import { useApi } from '@/composables/use-api';

// export const usePerfilStore = defineStore('perfil', () => {
//   const nombre = ref<string>('');
//   const nivel = ref<string>('');
//   const componentesAsignados = ref<any[]>([]);
//   const componentesDisponibles = ref<any[]>([]);

//   // Función para obtener los componentes por ID de perfil
//   const obtenerComponentesPorPerfilId = async (perfilId: number) => {
//     try {
//       const response = await useApi.get(`/api/v1/Perfiles-Componentes/Componentes/${perfilId}`);
//       componentesAsignados.value = response.data;
//     } catch (error) {
//       console.error('Error al obtener componentes por perfil ID:', error);
//     }
//   };

//   // Función para agregar componentes
//   const agregarComponente = async (perfilId: number) => {
//     try {
//       const response = await useApi.get(`/api/v1/Perfiles-Componentes/NoComponentes/${perfilId}`);
//       componentesDisponibles.value = response.data;
//     } catch (error) {
//       console.error('Error al agregar componente:', error);
//     }
//   };

//   return {
//     nombre,
//     nivel,
//     componentesAsignados,
//     componentesDisponibles,
//     obtenerComponentesPorPerfilId,
//     agregarComponente,
//   };
// });
