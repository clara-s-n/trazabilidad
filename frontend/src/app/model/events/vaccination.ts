/** Parámetros de ruta para operaciones con vaccination */
export interface VaccinationParams {
  vaccination_id: string;
}

export interface VaccinationCreate {
  animal_id: string;
  vaccine: string;
  dosage: string;
  provider: string;
  date: string;
  comments?: string;
}

export interface Vaccination {
  id: string;
  event_id: string;
  vaccine: string;
  dosage: string;
  provider: string;
}
