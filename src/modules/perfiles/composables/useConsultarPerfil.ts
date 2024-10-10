import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { PerfilComponenteResponse } from '../dto/PerfilComponenteResponse.dto'; // Asegúrate de tener un tipo para Perfil

export const useConsultarPerfil = () => {
  const mutation = useMutation({
    // Función de la mutación: recibe un objeto con perfilId y estado
    mutationFn: async ({ perfilId }: { perfilId: number }) => {
      // Realiza la llamada API para obtener el perfil usando perfilId y estado
      const response = await useApi.get<PerfilComponenteResponse>(`/api/v1/Perfiles-Componentes/${perfilId}`);
      
      // Retorna los datos obtenidos del servidor
      return response.data;
    },
    // Manejo de errores
    onError: (error: AxiosError) => {
      // Maneja el error con un mensaje adecuado
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al obtener el perfil';

      // Muestra el error usando SweetAlert
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
  });

  return mutation;
};
