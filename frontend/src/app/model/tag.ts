/**
 * Parámetros para rutas que requieren un ID de tag
 */
export interface TagParams {
  /** ID de la tag en formato UUID */
  tag_id: string;
}

/**
 * Estados posibles de una tag
 */
export type TagStatus = 'active' | 'inactive' | 'retired';

/**
 * Representa una tag (caravana electrónica)
 */
export interface Tag {
  /** Identificador único */
  id: string;
  /** Código del país */
  country_code: string;
  /** ISO del país */
  country_iso: string;
  /** Ministerio asociado */
  ministry: string;
  /** Número de tag impreso en la caravana */
  tag_number: string;
  /** Estado actual de la tag */
  status: TagStatus;
}

/**
 * Payload para actualizar el estado de una tag
 */
export interface UpdateTag {
  /** Nuevo estado de la tag */
  status: TagStatus;
}

/**
 * Registro de historial de asignación/desasignación de tags a animales
 */
export interface TagHistoryRecord {
  /** ID de la tag */
  tag_id: string;
  /** Número o identificación visible de la tag */
  tag_number?: string;
  /** Fecha de asignación en formato ISO */
  assignment_date: string;
  /** Fecha de desasignación en formato ISO, si aplica */
  unassignment_date?: string;
}
