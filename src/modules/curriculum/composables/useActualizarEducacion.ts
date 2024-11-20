// src/composables/curriculum/useActualizarEducacion.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { EducacionRequest } from '../dto/EducacionResquest.dto';

export const useActualizarEducacion = () => {
  return useMutation({
    mutationFn: async (data: { edu_id: number, educacion: EducacionRequest }) => {
        console.log("Entrando a actualizar educacion");
      const response = await useApi.patch(`/api/v1/curriculum/educacion/${data.edu_id}`, data.educacion);
      return response.data;
    },
    onError: (error: AxiosError<ServerError>) => {
      const serverMessage = error.response?.data?.message || 'Ocurrió un error al actualizar la educación';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'La educación se ha actualizado correctamente',
        icon: 'success',
      });
    },
  });
};
