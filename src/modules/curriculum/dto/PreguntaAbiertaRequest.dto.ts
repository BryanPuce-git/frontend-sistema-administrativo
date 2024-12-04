// DTO para una pregunta abierta
export interface PreguntaAbiertaRequest {
    prg_id: number;  // ID de la pregunta
    pra_pregunta: string;  // Texto de la pregunta
    pra_respuesta?: string;  // Respuesta a la pregunta (opcional)
  }
  