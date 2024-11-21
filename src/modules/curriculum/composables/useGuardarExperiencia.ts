// src/modules/curriculum/composables/useGuardarExperiencia.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { ExperienciaRequest } from '../dto/Experiencia.dto';

export const useGuardarExperiencia = () => {
  const mutation = useMutation({
    mutationFn: async (data: ExperienciaRequest) => {
      console.log("Entrando a guardar experiencia", data);
      const response = await useApi.post('/api/v1/curriculum/experiencia', data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar la información de experiencia';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'La experiencia se ha guardado correctamente',
        icon: 'success',
      });
    },
  });

  return mutation;
};
