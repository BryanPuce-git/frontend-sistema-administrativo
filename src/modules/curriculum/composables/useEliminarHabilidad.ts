import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';

export const useEliminarHabilidad = () => {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      // Llamada al endpoint DELETE para eliminar la habilidad
      const response = await useApi.delete(`/api/v1/curriculum/habilidades/${id}`);
      return response.data;
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al eliminar la habilidad';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'La habilidad se ha eliminado correctamente',
        icon: 'success',
      });
    },
  });

  return mutation;
};
