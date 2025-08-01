import { query } from "./database.js";
import { Weighing } from "../types/schemas/weighing.js";

export class WeighingRepository {
  // Crear un nuevo pesaje
  async createWeighing(data: {
    event_id: string;
    weight: number;
    unit?: string;
  }): Promise<Weighing> {
    const { rows } = await query(
      `INSERT INTO weightings(id, event_id, weight, unit)
       VALUES (gen_random_uuid(), $1, $2, $3)
       RETURNING id, event_id, weight, unit`,
      [data.event_id, data.weight, data.unit || "kg"]
    );
    return rows[0];
  }

  // Listar todos los pesajes de un animal
  async getByAnimal(animalId: string): Promise<Weighing[]> {
    const { rows } = await query(
      `SELECT w.id, w.event_id, w.weight, w.unit
       FROM weightings w
       JOIN animal_event ae    ON ae.event_id = w.event_id
       JOIN events e            ON e.id         = ae.event_id
       JOIN event_type et       ON et.id        = e.event_type
       WHERE ae.animal_id = $1
         AND et.name      = 'Weighing'`,
      [animalId]
    );
    return rows as Weighing[];
  }

  // Verificar que el event_id corresponda a un pesaje de este animal
  async getValidWeighingEvent(
    animalId: string,
    eventId: string
  ): Promise<boolean> {
    const { rows } = await query(
      `SELECT 1
       FROM animal_event ae
       JOIN events e      ON e.id        = ae.event_id
       JOIN event_type et ON et.id       = e.event_type
       WHERE ae.animal_id = $1
         AND ae.event_id  = $2
         AND et.name      = 'Weighing'
       LIMIT 1`,
      [animalId, eventId]
    );
    return rows.length > 0;
  }
}

export const weighingRepository = new WeighingRepository();