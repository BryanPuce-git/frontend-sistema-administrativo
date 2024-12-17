export interface PreguntaCerradaRequest {
  prg_id: number;
  prc_pregunta: string;
  prc_pregunta_excluyente?: number; // Pregunta excluyente (opcional)
  opciones: OpcionRespuesta[];      // Asume que la propiedad para manejar las opciones ahora es 'opciones'
}

interface OpcionRespuesta {
  texto: string;
  seleccionada: boolean;
}
