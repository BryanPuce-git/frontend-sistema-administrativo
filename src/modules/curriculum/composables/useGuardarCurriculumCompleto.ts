
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

export const useGuardarCurriculumCompleto = () => {
  // Función para guardar la información personal
  const guardarInfoPersonal = async (data: InformacionPersonalRequest) => {
    console.log("Entrando a guardar personalInfo");
    return await useApi.post('/api/v1/curriculum/informacion-personal', data);
  };

  // Función para guardar el salario
  const guardarSalario = async (data: SalarioRequest) => {
    console.log("Entrando a guardar salario");
    return await useApi.post('/api/v1/curriculum/salario', data);
  };

  // Función para guardar la educación
  const guardarEducacion = async (data: EducacionRequest) => {
    console.log("Entrando a guardar Eduacion");
    return await useApi.post('/api/v1/curriculum/educacion', data);
  };

  const guardarExperiencia = async (data: ExperienciaRequest) => {
    console.log("Entrando a guardar experiencia");
    return await useApi.post('/api/v1/curriculum/educacion', data);
  };

  // Mutación para guardar todo el curriculum
  const guardarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      // Guardar cada sección de manera secuencial
      await guardarInfoPersonal(data.personalInfo);
      await guardarSalario(data.salario);
      await guardarEducacion(data.educacion);
      await guardarExperiencia(data.experiencia);
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
