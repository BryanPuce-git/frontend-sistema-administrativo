export interface EducacionRequest {
    pcom_id: number;
    edu_nivel_estudios: number | null;
    edu_estado_estudios: number | null;
    edu_area_estudios: string | null;
    edu_institucion_educativa: string | null;
    edu_educacion_excluyente: number;
  }