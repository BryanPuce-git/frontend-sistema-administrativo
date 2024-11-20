// src/composables/curriculum/useActualizarInfoPersonal.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { InformacionPersonalRequest } from '../dto/InformacionPersonalRequest.dto';

export const useActualizarInfoPersonal = () => {
  return useMutation({
    mutationFn: async (data: { inf_id: number, personalInfo: InformacionPersonalRequest }) => {
      console.log("Entrando a actualizar Info", data);
      const response = await useApi.patch(`/api/v1/curriculum/informacion-personal/${data.inf_id}`, data.personalInfo);
      return response.data;
    },
    onError: (error: AxiosError<ServerError>) => {
      const serverMessage = error.response?.data?.message || 'Ocurrió un error al actualizar la información personal';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'La información personal se ha actualizado correctamente',
        icon: 'success',
      });
    },
  });
};
