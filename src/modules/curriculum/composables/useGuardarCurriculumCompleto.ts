import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { InformacionPersonalRequest } from '../dto/InformacionPersonalRequest.dto';
import type { SalarioRequest } from '../dto/SalarioRequest.dto';
import type { EducacionRequest } from '../dto/EducacionResquest.dto';
import type { ExperienciaRequest } from '../dto/Experiencia.dto';
import type { PreguntaAbiertaRequest } from '../dto/PreguntaAbiertaRequest.dto';
import type { PreguntaCerradaRequest } from '../dto/PreguntaCerradaRequest.dto';
import type { PreguntaArchivoRequest } from '../dto/PreguntaArchivoRequest.dto';

interface CurriculumData {
  personalInfo: InformacionPersonalRequest;
  salario: SalarioRequest;
  educacion: EducacionRequest;
  experiencia: ExperienciaRequest;
  preguntasAbiertas: PreguntaAbiertaRequest[];
  preguntasCerradas: PreguntaCerradaRequest[];
  preguntasArchivo: PreguntaArchivoRequest[];
}

export const useGuardarCurriculumCompleto = () => {
  const guardarInfoPersonal = async (data: InformacionPersonalRequest) => {
    return await useApi.post('/api/v1/curriculum/informacion-personal', data);
  };

  const guardarSalario = async (data: SalarioRequest) => {
    return await useApi.post('/api/v1/curriculum/salario', data);
  };

  const guardarEducacion = async (data: EducacionRequest) => {
    return await useApi.post('/api/v1/curriculum/educacion', data);
  };

  const guardarExperiencia = async (data: ExperienciaRequest) => {
    return await useApi.post('/api/v1/curriculum/experiencia', data);
  };

  const guardarPreguntasAbiertas = async (preguntas: PreguntaAbiertaRequest[]) => {
    for (const pregunta of preguntas) {
      await useApi.post('/api/v1/curriculum/preguntas/abiertas', pregunta);
    }
  };

  const guardarPreguntasCerradas = async (preguntas: PreguntaCerradaRequest[]) => {
    for (const pregunta of preguntas) {
      await useApi.post('/api/v1/curriculum/preguntas/cerradas', pregunta);
    }
  };

  const guardarPreguntasArchivo = async (preguntas: PreguntaArchivoRequest[]) => {
    for (const pregunta of preguntas) {
      await useApi.post('/api/v1/curriculum/preguntas/archivo', pregunta);
    }
  };

  const guardarCurriculumCompleto = useMutation({
    mutationFn: async (data: CurriculumData) => {
      await guardarInfoPersonal(data.personalInfo);
      await guardarSalario(data.salario);
      await guardarEducacion(data.educacion);
      await guardarExperiencia(data.experiencia);
      await guardarPreguntasAbiertas(data.preguntasAbiertas);
      await guardarPreguntasCerradas(data.preguntasCerradas);
      await guardarPreguntasArchivo(data.preguntasArchivo);
    },
    onError: (error: AxiosError<ServerError>) => {
      const serverMessage = error.response?.data.message || 'Ocurrió un error al guardar el currículum';
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
