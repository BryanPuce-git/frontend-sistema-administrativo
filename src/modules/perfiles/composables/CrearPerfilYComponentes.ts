import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { PerfilComponenteCreate } from '../dto/PerfilComponenteCreate.dto'; // Asegúrate de tener un tipo para Perfil

export const useCrearPerfilComponente = () => {
  const mutation = useMutation({
    // Función de la mutación: recibe un objeto con los datos del nuevo perfil y componentes
    mutationFn: async (perfilComponente: PerfilComponenteCreate) => {
      // Realiza la llamada API para crear el nuevo perfil y sus componentes
      const response = await useApi.post<PerfilComponenteCreate>('/api/v1/Perfiles-Componentes', perfilComponente);

      // Retorna los datos obtenidos del servidor (si la API devuelve algo, ajusta según el response)
      return response.data;
    },
    // Manejo de errores
    onError: (error: AxiosError) => {
      // Maneja el error con un mensaje adecuado
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al crear el perfil con sus componentes';

      // Muestra el error usando SweetAlert
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    // Opcional: se pueden agregar opciones como `onSuccess` o `onSettled` para manejar el éxito o la finalización
  });

  return mutation;
};
