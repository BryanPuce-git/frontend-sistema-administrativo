// src/composables/curriculum/useActualizarSalario.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { SalarioRequest } from '../dto/SalarioRequest.dto';

export const useActualizarSalario = () => {
  return useMutation({
    mutationFn: async (data: { sal_id: number, salario: SalarioRequest }) => {
        console.log("Entrando a actualizar salario");
      const response = await useApi.patch(`/api/v1/curriculum/salario/${data.sal_id}`, data.salario);
      return response.data;
    },
    onError: (error: AxiosError<ServerError>) => {
      const serverMessage = error.response?.data?.message || 'Ocurrió un error al actualizar el salario';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'El salario se ha actualizado correctamente',
        icon: 'success',
      });
    },
  });
};
