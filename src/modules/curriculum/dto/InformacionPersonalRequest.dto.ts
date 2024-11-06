export interface InformacionPersonalRequest {
    pcom_id: number;
    inf_edad_desde: number | null;
    inf_edad_hasta: number | null;
    inf_genero: number | null;
    inf_estado_civil: number | null;
    inf_ciudad_cargo: number | null;
    inf_capacidad_reubicacion: number | null;
    inf_candidatos_discapacidad: number | null;
    inf_edad_excluyente: number;
    inf_estado_civil_excluyente: number;
    inf_genero_excluyente: number;
    inf_capacidad_reubicacion_excluyente: number;
    inf_candidatos_discapacidad_excluyente: number;
    inf_ciudad_cargo_excluyente: number;
  }
  