// PreguntaCerradaRequest.dto.ts
export interface PreguntaCerradaRequest {
  prg_id: number;               // ID de la pregunta
  prg_pregunta: string;         // Texto de la pregunta cerrada
  prg_opcion: string;           // Opciones para la pregunta cerrada
  prg_seleccion: number;        // ID de la opción seleccionada
  prg_pregunta_excluyente: number;  // Indica si la pregunta es excluyente (1 para sí, 0 para no)
}
