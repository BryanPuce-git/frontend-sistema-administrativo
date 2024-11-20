// src/composables/curriculum/useActualizarExperiencia.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { ExperienciaRequest } from '../dto/Experiencia.dto';

export const useActualizarExperiencia = () => {
  return useMutation({
    mutationFn: async (data: { exp_id: number, experiencia: ExperienciaRequest }) => {
      console.log("Entrando a actualizar experiencia");
      const response = await useApi.patch(`/api/v1/curriculum/experiencia/${data.exp_id}`, data.experiencia);
      return response.data;
    },
    onError: (error: AxiosError<ServerError>) => {
      const serverMessage = error.response?.data?.message || 'Ocurrió un error al actualizar la experiencia';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'La experiencia se ha actualizado correctamente',
        icon: 'success',
      });
    },
  });
};
