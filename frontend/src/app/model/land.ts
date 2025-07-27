/** Parámetros de ruta para operaciones con predios */
export interface LandParams {
  land_id: string;  // UUID del predio
}

/** Cuerpo para crear un nuevo predio */
export interface CreateLand {
  name: string;       // Nombre del predio (minLength: 3)
  latitude: number;   // Latitud –90 a 90
  longitude: number;  // Longitud –180 a 180
}

/** Cuerpo para actualizar un predio (campos opcionales) */
export interface UpdateLand {
  name?: string;       // Nombre del predio (minLength: 3)
  latitude?: number;   // Latitud –90 a 90
  longitude?: number;  // Longitud –180 a 180
}

/** Modelo completo de un Predio tal como viene de la API */
export interface Land {
  id: string;        // UUID
  name: string;
  latitude: number;
  longitude: number;
}
