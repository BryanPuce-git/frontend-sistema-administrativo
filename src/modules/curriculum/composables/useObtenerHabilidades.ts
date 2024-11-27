import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';

export const useObtenerHabilidades = () => {
  const mutation = useMutation({
    mutationFn: async (pcomId: number) => {
      console.log("Entrando a obtener habilidades para pcomId:", pcomId);
      // Realiza la solicitud GET al endpoint correspondiente
      const response = await useApi.get(`/api/v1/curriculum/habilidades/${pcomId}`);
      return response.data; 
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al obtener las habilidades';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      console.log("Habilidades obtenidas con éxito");
    },
  });

  return mutation;
};
