import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';

export const useCrearPreguntaCerrada = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log('Enviando datos de pregunta cerrada:', data);
      return await useApi.post('/api/v1/curriculum/preguntas/cerradas', data);
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al crear la pregunta cerrada';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'Pregunta cerrada creada exitosamente',
        icon: 'success',
      });
    },
  });

  return mutation;
};
