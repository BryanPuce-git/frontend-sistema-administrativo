import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';

export const useCrearPreguntaFiltro = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
     
      const response = await useApi.post('/api/v1/curriculum/preguntas', data);
      return response.data; 
    },
    onError: (error: AxiosError) => {
      // Manejo de errores
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar la pregunta filtro';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: (response) => {
      // Mensaje de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'Pregunta filtro creada correctamente.',
        icon: 'success',
      });
      console.log('Respuesta del servidor:', response);
    },
  });

  return mutation;
};
