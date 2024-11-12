// src/modules/curriculum/composables/useGuardarCurriculumCompleto.ts

import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { InformacionPersonalRequest } from '../dto/InformacionPersonalRequest.dto';
import type { SalarioRequest } from '../dto/SalarioRequest.dto';

interface CurriculumData {
  personalInfo: InformacionPersonalRequest;
  salario: SalarioRequest;
}

export const useGuardarCurriculumCompleto = () => {
 

  const guardarInfoPersonal = async (data: InformacionPersonalRequest) => {
    return await useApi.post('/api/v1/curriculum/informacion-personal', data);
  };

  const guardarSalario = async (data: SalarioRequest) => {
    return await useApi.post('/api/v1/curriculum/salario', data);
  };

  const guardarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      await guardarInfoPersonal(data.personalInfo);
      await guardarSalario(data.salario);
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar el curriculum';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'Toda la información del curriculum se ha guardado correctamente',
        icon: 'success',
      });
    },
  });

  return { guardarCurriculumCompleto };
};
