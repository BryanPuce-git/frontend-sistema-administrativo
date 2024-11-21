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
  experiencia: ExperienciaRequest;
 
}

export const useActualizarCurriculumCompleto = () => {
  // Función para actualizar la información personal
  const actualizarInfoPersonal = async ( data: InformacionPersonalRequest) => {
    console.log('datos de personalInfo antes de actualizar ', data.inf_id);
    return await useApi.patch(`/api/v1/curriculum/informacion-personal/${data.inf_id}`, data);
  };

  // Función para actualizar el salario
  const actualizarSalario = async ( data: SalarioRequest) => {
    console.log('datos de salario antes de actualizar ', data);
    return await useApi.patch(`/api/v1/curriculum/salario/${data.sal_id}`, data);
  };

  // Función para actualizar la educación
  const actualizarEducacion = async ( data: EducacionRequest) => {
    console.log('datos de educación antes de actualizar ', data);
    return await useApi.patch(`/api/v1/curriculum/educacion/${data.edu_id}`, data);
  };

  // Función para actualizar la experiencia
  const actualizarExperiencia = async ( data: ExperienciaRequest) => {
    console.log('datos de experiencia antes de actualizar ', data);
    return await useApi.patch(`/api/v1/curriculum/experiencia/${data.exp_id}`, data);
  };

  // Mutación para actualizar todo el curriculum
  const actualizarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      const {  personalInfo, salario, educacion, experiencia } =
        data;

      // Actualizar cada sección de manera secuencial
      await actualizarInfoPersonal( personalInfo);
      await actualizarSalario( salario);
      await actualizarEducacion( educacion);
      await actualizarExperiencia(experiencia);
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

  return actualizarCurriculumCompleto;
};
