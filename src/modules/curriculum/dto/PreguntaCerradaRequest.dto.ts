// export interface PreguntaCerradaRequest {
//   prg_id: number;                    // ID principal de la pregunta
//   pcom_id: number;                   // ID del componente
//   prg_tipo_pregunta: number;         // Tipo de la pregunta
//   prc_pregunta: string;              // Texto de la pregunta
//   prc_opcion: string;                // Texto de la opción
//   prc_seleccion: number;             // Estado de selección: 1 o 0
//   prc_pregunta_excluyente?: number;  // Campo opcional para exclusión
//   prg_pregunta_predeterminada?: number; // Indicador de pregunta predeterminada
//   tipo_pregunta?: string;            // Texto descriptivo del tipo de pregunta (Cerrada, Abierta, etc.)
//   pregunta?: string;                 // Campo opcional para texto de la pregunta
// }

export interface PreguntaCerradaRequest {
  prg_id: number;
  pregunta: string;
  opcion: string;
  seleccion: number;
  prc_pregunta_excluyente?: number;  // Campo opcional para exclusión
}