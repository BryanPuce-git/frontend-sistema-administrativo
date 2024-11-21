export interface EducacionRequest {
  edu_id?: number;
  pcom_id: number;
  edu_nivel_estudios: number;
  edu_estado_estudios: number;
  edu_area_estudios: string | null;
  edu_institucion_educativa: string | null;
  edu_educacion_excluyente: number;
}
