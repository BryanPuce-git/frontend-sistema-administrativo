// src/modules/curriculum/composables/useGuardarInfoPersonal.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api'; 
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { InformacionPersonalRequest } from '../dto/InformacionPersonalRequest.dto';

export const useGuardarInfoPersonal = () => {
  const mutation = useMutation({
    mutationFn: async (data: InformacionPersonalRequest) => {
     
      const response = await useApi.post('/api/v1/curriculum/informacion-personal', data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar la información personal';

     
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
     
      Swal.fire({
        title: 'Éxito',
        text: 'La información personal se ha guardado correctamente',
        icon: 'success',
      });
    },
  });

  return mutation;
};
