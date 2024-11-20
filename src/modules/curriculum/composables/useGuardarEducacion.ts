// src/modules/curriculum/composables/useGuardarEducacion.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { EducacionRequest } from '../dto/EducacionResquest.dto';

export const useGuardarEducacion = () => {
  const mutation = useMutation({
    mutationFn: async (data: EducacionRequest) => {
      console.log("Entrando a guardar educacion");
      const response = await useApi.post('/api/v1/curriculum/educacion', data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar la información educativa';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'La educación se ha guardado correctamente',
        icon: 'success',
      });
    },
  });

  return mutation;
};
