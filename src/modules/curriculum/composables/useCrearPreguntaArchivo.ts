import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { PreguntaArchivoRequest } from '../dto/PreguntaArchivoRequest.dto';

export const useCrearPreguntaArchivo = () => {
    const mutation = useMutation({
      mutationFn: async (data : PreguntaArchivoRequest) => {
        console.log('Enviando datos de pregunta de archivo:', data);
        return await useApi.post('/api/v1/curriculum/preguntas/archivo', data);
      },
      onError: (error: AxiosError) => {
        const data = error.response?.data as ServerError;
        const serverMessage = data?.message || 'Ocurrió un error al crear la pregunta de archivo';
        Swal.fire({
          title: 'Error',
          text: serverMessage,
          icon: 'error',
        });
      },
      onSuccess: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Pregunta de archivo creada exitosamente',
          icon: 'success',
        });
      },
    });
  
    return mutation;
  };
  