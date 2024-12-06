// PreguntaArchivoRequest.dto.ts
export interface PreguntaArchivoRequest {
  prg_id: number;           // ID de la pregunta
  prh_pregunta: string;     // Texto de la pregunta que pide un archivo
  prh_direccion: string;    // Dirección o ruta donde se almacenará el archivo
  prh_pregunta_excluyente: number;  // Indica si la pregunta es excluyente (1 para sí, 0 para no)
}
