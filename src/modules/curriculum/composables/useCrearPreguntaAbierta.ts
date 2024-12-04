import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { PreguntaAbiertaRequest } from '../dto/PreguntaAbiertaRequest.dto';

export const useCrearPreguntaAbierta = () => {
  const mutation = useMutation({
    mutationFn: async (data : PreguntaAbiertaRequest) => {
      console.log('Enviando datos de pregunta abierta:', data);
      
      return await useApi.post('/api/v1/curriculum/preguntas/abiertas', data);
    },
    onError: (error: AxiosError) => {
      // Extract and handle the server error
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al crear la pregunta abierta';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      // Success message
      Swal.fire({
        title: 'Éxito',
        text: 'Pregunta abierta creada exitosamente',
        icon: 'success',
      });
    },
  });

  return mutation;
};
