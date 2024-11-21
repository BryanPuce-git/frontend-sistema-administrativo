export interface ExperienciaRequest {
  exp_id?: number;
  pcom_id: number; // ID relacionado al perfil o componente
  exp_cargo: string; // Nombre del cargo
  exp_años_experiencia_desde: number; // Años de experiencia mínimos requeridos
  exp_años_experiencia_hasta: number; // Años de experiencia máximos requeridos
  exp_areas_departamentos: string | null; // Áreas laborales seleccionadas (separadas por comas)
  exp_subarea_laboral: string | null; // Sub áreas laborales seleccionadas (separadas por comas)
  exp_sector_empresa: string | null; // Sectores o industrias seleccionados (separados por comas)
  exp_experiencia_excluyente: number; // Indicador de si la experiencia es excluyente (0 = No, 1 = Sí)
}
