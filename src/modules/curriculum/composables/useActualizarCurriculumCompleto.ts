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
  const handleError = (error: AxiosError, section: string) => {
    const serverData = error.response?.data as ServerError;
    const errorMessage = serverData?.message || `Error al actualizar ${section}`;
    Swal.fire({
      title: 'Error de actualización',
      text: errorMessage,
      icon: 'error',
    });
  };

  const actualizarInfoPersonal = async (data: InformacionPersonalRequest) => {
    try {
      return await useApi.patch(`/api/v1/curriculum/informacion-personal/${data.inf_id}`, data);
    } catch (error) {
      handleError(error as AxiosError, 'la información personal');
      throw error;  // Re-throw para manejar en el proceso global
    }
  };

  const actualizarSalario = async (data: SalarioRequest) => {
    try {
      return await useApi.patch(`/api/v1/curriculum/salario/${data.sal_id}`, data);
    } catch (error) {
      handleError(error as AxiosError, 'el salario');
      throw error;
    }
  };

  const actualizarEducacion = async (data: EducacionRequest) => {
    try {
      return await useApi.patch(`/api/v1/curriculum/educacion/${data.edu_id}`, data);
    } catch (error) {
      handleError(error as AxiosError, 'la educación');
      throw error;
    }
  };

  const actualizarExperiencia = async (data: ExperienciaRequest) => {
    try {
      return await useApi.patch(`/api/v1/curriculum/experiencia/${data.exp_id}`, data);
    } catch (error) {
      handleError(error as AxiosError, 'la experiencia');
      throw error;
    }
  };

  const actualizarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      await actualizarInfoPersonal(data.personalInfo);
      await actualizarSalario(data.salario);
      await actualizarEducacion(data.educacion);
      await actualizarExperiencia(data.experiencia);
    },
    onError: (error: AxiosError) => {
      Swal.fire({
        title: 'Error Global',
        text: 'Ocurrió un error general al actualizar el curriculum.',
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
