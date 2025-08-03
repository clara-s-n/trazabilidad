/** Parámetros de ruta para operaciones con weighing */
export interface VaccinationParams {
  weighing_id: string;
}

export interface WeighingCreate {
  animal_id: string;
  weight: number;
  unit: string;
  date: string;
  comments?: string;
}

export interface Weighing {
  id: string;
  event_id: string;
  weight: string;
  unit: string;
}
