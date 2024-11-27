import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';

export const useActualizarHabilidad = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await useApi.patch(`/api/v1/curriculum/habilidades/${id}`, data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al actualizar la habilidad';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
  });

  return mutation;
};
