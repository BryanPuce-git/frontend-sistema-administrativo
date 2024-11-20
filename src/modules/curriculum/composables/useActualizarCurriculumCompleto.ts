import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { InformacionPersonalRequest } from '../dto/InformacionPersonalRequest.dto';
import type { SalarioRequest } from '../dto/SalarioRequest.dto';
import type { EducacionRequest } from '../dto/EducacionResquest.dto';
import type { ExperienciaRequest } from '../dto/Experiencia.dto';

interface CurriculumData {
  personalInfo: InformacionPersonalRequest;
  salario: SalarioRequest;
  educacion: EducacionRequest;
  experiencia: ExperienciaRequest
  pcom_id: number; 
}

export const useActualizarCurriculumCompleto = () => {
 
  // Función para actualizar la información personal
  const actualizarInfoPersonal = async (pcom_id: number, data: InformacionPersonalRequest) => {
    console.log("datos de personalInfo antes de actualizar ", data)
    return await useApi.patch(`/api/v1/curriculum/informacion-personal/${pcom_id}`, data);
  };

  // Función para actualizar el salario
  const actualizarSalario = async (pcom_id: number, data: SalarioRequest) => {
    console.log("datos de salario antes de actualizar ", data)
    return await useApi.patch(`/api/v1/curriculum/salario/${pcom_id}`, data);
  };

  // Función para actualizar la educación
  const actualizarEducacion = async (pcom_id: number, data: EducacionRequest) => {
    console.log("datos de educación antes de actualizar ", data)
    return await useApi.patch(`/api/v1/curriculum/educacion/${pcom_id}`, data);
  };

  // Función para actualizar la experiencia
  const actualizarExperiencia = async (pcom_id: number, data: ExperienciaRequest) => {
    console.log("datos de experiencia antes de actualizar ", data)
    return await useApi.patch(`/api/v1/curriculum/educacion/${pcom_id}`, data);
  };

  // Mutación para actualizar todo el curriculum
  const actualizarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      const { pcom_id, personalInfo, salario, educacion, experiencia } = data;

      // Actualizar cada sección de manera secuencial
      await actualizarInfoPersonal(pcom_id, personalInfo);
      await actualizarSalario(pcom_id, salario);
      await actualizarEducacion(pcom_id, educacion);
      await actualizarExperiencia(pcom_id, experiencia);
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al actualizar el curriculum';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'Toda la información del curriculum se ha actualizado correctamente',
        icon: 'success',
      });
    },
  });

  return { actualizarCurriculumCompleto };
};
