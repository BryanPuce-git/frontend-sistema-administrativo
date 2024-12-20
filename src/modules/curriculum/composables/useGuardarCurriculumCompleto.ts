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
// import cloneDeep from 'lodash.clonedeep';

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
    console.log('Entrando a guardar experiencia', data);
    return await useApi.post('/api/v1/curriculum/experiencia', data);
  };

  const guardarPreguntasAbiertas = async (preguntas: PreguntaAbiertaRequest[]) => {
    if (!Array.isArray(preguntas) || preguntas.length === 0) {
      console.log('No hay preguntas abiertas para guardar.');
      return;
    }
    console.log('Entrando a guardar preguntas abiertas con datos:', preguntas);
    for (const pregunta of preguntas) {
      try {
        const respuesta = await useApi.post('/api/v1/curriculum/preguntas/abiertas', pregunta);
        console.log('Respuesta de guardar pregunta abierta:', respuesta);
      } catch (error) {
        console.error('Error al guardar pregunta abierta:', error);
      }
    }
  };

  const guardarPreguntasCerradas = async (preguntasCerradas: PreguntaCerradaRequest[]) => {
    console.log('Inicio de la función, comprobación inicial:', preguntasCerradas);

    if (!Array.isArray(preguntasCerradas) || preguntasCerradas.length === 0) {
      console.log('No hay preguntas cerradas para guardar.');
      return;
    }

    for (const pregunta of preguntasCerradas) {
      console.log('Verificando pregunta', pregunta);

      console.log('Verificando pregunta:', JSON.stringify(pregunta, null, 2));
      console.dir(pregunta, { depth: null });
      console.log('Propiedades del objeto pregunta:', Object.keys(pregunta));

      const prg_id = pregunta.prg_id; // ID principal de la pregunta
      const prc_pregunta = pregunta.pregunta || 'Texto no especificado'; // Texto de la pregunta
      const prc_opcion = (pregunta.opcion && pregunta.opcion.trim()) || 'Opción no especificada'; // Opción individual
      const prc_seleccion = pregunta.seleccion || 0; // Selección (0 o 1)
      const prc_pregunta_excluyente = pregunta.prc_pregunta_excluyente || 0; // Campo opcional para exclusión

      const preguntaCerradaRequest = {
        prg_id,
        prc_pregunta,
        prc_opcion,
        prc_seleccion,
        prc_pregunta_excluyente,
      };

      console.log('Enviando datos al POST:', preguntaCerradaRequest);

      try {
        const response = await useApi.post(
          '/api/v1/curriculum/preguntas/cerradas',
          preguntaCerradaRequest,
        );
        console.log('Registro guardado con éxito:', response.data);
      } catch (error) {
        console.error('Error al guardar pregunta cerrada:', error);
      }
    }
  };

  const guardarPreguntasArchivo = async (preguntas: PreguntaArchivoRequest[]) => {
    if (!Array.isArray(preguntas) || preguntas.length === 0) {
      console.log('No hay preguntas de archivo para guardar.');
      return;
    }
    console.log('Entrando a guardar preguntas de archivo con datos:', preguntas);
    for (const pregunta of preguntas) {
      try {
        const respuesta = await useApi.post('/api/v1/curriculum/preguntas/archivo', pregunta);
        console.log('Respuesta de guardar pregunta de archivo:', respuesta);
      } catch (error) {
        console.error('Error al guardar pregunta de archivo:', error);
      }
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
      const serverMessage =
        error.response?.data.message || 'Ocurrió un error al guardar el currículum';
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
