export interface PreguntaCerradaRequest {
  prg_id: number;                    // ID principal de la pregunta
  prc_pregunta: string;              // Texto de la pregunta
  prc_opcion: string;                // Texto de la opción
  prc_seleccion: number;             // Estado de selección: 1 o 0
  prc_pregunta_excluyente?: number;  // Campo opcional para exclusión
}
