
import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { HabilidadRequest } from '../dto/HabilidadesRequest.dto';

export const useGuardarHabilidades= () => {
  const mutation = useMutation({
    mutationFn: async (data: HabilidadRequest) => {
      console.log("Entrando a guardar educacion", data);
      const response = await useApi.post('/api/v1/curriculum/habilidades', data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar habilidades';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    // onSuccess: () => {
    //   Swal.fire({
    //     title: 'Éxito',
    //     text: 'La Habilidad se ha guardado correctamente',
    //     icon: 'success',
    //   });
    // },
  });

  return mutation;
};
