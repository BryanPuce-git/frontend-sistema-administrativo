// DTO para una pregunta de archivo
export interface PreguntaArchivoRequest {
    prg_id: number;  // ID de la pregunta
    prh_pregunta: string;  // Texto de la pregunta
    prh_direccion_archivo: string;  // Ruta o dirección del archivo
    prh_pregunta_excluyente: number;  // Indicador si la pregunta es excluyente (1: sí, 0: no)
  }

  