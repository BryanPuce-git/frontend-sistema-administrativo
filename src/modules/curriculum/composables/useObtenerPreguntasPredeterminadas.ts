import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';

export const useObtenerPreguntasPredeterminadas = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Obteniendo preguntas predeterminadas...");
      // Realiza la solicitud GET al endpoint correspondiente
      const response = await useApi.get('/api/v1/curriculum/preguntas-predeterminadas');
      return response.data;
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al obtener las preguntas predeterminadas';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      console.log("Preguntas predeterminadas obtenidas con éxito");
    },
  });

  return mutation;
};
