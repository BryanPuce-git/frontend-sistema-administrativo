// DTO para una pregunta cerrada
export interface PreguntaCerradaRequest {
    prg_id: number;  // ID de la pregunta
    prc_pregunta: string;  // Texto de la pregunta
    prc_opciones: string;  // Opciones disponibles, como "Sí / No / Tal vez"
    prc_seleccion: number;  // Identificador del tipo de selección (podría ser un enum)
    prc_pregunta_excluyente: number;  // Indicador si la pregunta es excluyente (1: sí, 0: no)
  }
  