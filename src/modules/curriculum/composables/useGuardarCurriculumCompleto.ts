import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { InformacionPersonalRequest } from '../dto/InformacionPersonalRequest.dto';
import type { SalarioRequest } from '../dto/SalarioRequest.dto';
import type { EducacionRequest } from '../dto/EducacionResquest.dto';
import type { ExperienciaRequest } from '../dto/Experiencia.dto';
// import type { PreguntaFiltroRequest } from '../dto/PreguntaFiltroRequest.dto'; // Define este tipo según tu backend

interface CurriculumData {
  personalInfo: InformacionPersonalRequest;
  salario: SalarioRequest;
  educacion: EducacionRequest;
  experiencia: ExperienciaRequest;
  // preguntasFiltro: PreguntaFiltroRequest[]; // Nuevo campo
}

export const useGuardarCurriculumCompleto = () => {
  // Función para guardar preguntas filtro
  // const guardarPreguntasFiltro = async (preguntas: PreguntaFiltroRequest[]) => {
  //   console.log('Guardando preguntas filtro:', preguntas);
  //   for (const pregunta of preguntas) {
  //     await useApi.post('/api/v1/curriculum/preguntas', pregunta);
  //   }
  // };

  // Función para guardar la información personal
  const guardarInfoPersonal = async (data: InformacionPersonalRequest) => {
    console.log('Entrando a guardar personalInfo', data);
    return await useApi.post('/api/v1/curriculum/informacion-personal', data);
  };

  // Función para guardar el salario
  const guardarSalario = async (data: SalarioRequest) => {
    console.log('Entrando a guardar salario', data);
    return await useApi.post('/api/v1/curriculum/salario', data);
  };

  // Función para guardar la educación
  const guardarEducacion = async (data: EducacionRequest) => {
    console.log('Entrando a guardar educación', data);
    return await useApi.post('/api/v1/curriculum/educacion', data);
  };

  // Función para guardar la experiencia
  const guardarExperiencia = async (data: ExperienciaRequest) => {
    console.log('Entrando a guardar experiencia', data);
    return await useApi.post('/api/v1/curriculum/experiencia', data);
  };

  // Mutación para guardar todo el currículum
  const guardarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      // Guardar cada sección de manera secuencial
      await guardarInfoPersonal(data.personalInfo);
      await guardarSalario(data.salario);
      await guardarEducacion(data.educacion);
      await guardarExperiencia(data.experiencia);

      // Guardar preguntas filtro
      // if (data.preguntasFiltro && data.preguntasFiltro.length > 0) {
      //   await guardarPreguntasFiltro(data.preguntasFiltro);
      // }
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al guardar el currículum';
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Éxito',
        text: 'Toda la información del currículum se ha guardado correctamente',
        icon: 'success',
      });
    },
  });

  return guardarCurriculumCompleto;
};
