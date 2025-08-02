import { query } from "./database.js";

export class EventRepository {
  // Crear evento y devolver el id
  async createEvent(data: {
    event_type: string;   // nombre del tipo, ej: 'Vaccination'
    date: string;         // timestamp
    comments?: string;
    created_by: string;
  }): Promise<{ id: string }> {
    const { rows } = await query(
      `INSERT INTO events(id, event_type, date, comments, created_by)
       VALUES (
         gen_random_uuid(),
         (SELECT id FROM event_type WHERE name = $1),
         $2, $3, $4
       )
       RETURNING id`,
      [data.event_type, data.date, data.comments || '', data.created_by]
    );
    return rows[0];
  }

  // Asociar evento a animal
  async linkEventToAnimal(event_id: string, animal_id: string) {
    await query(
      `INSERT INTO animal_event(id, event_id, animal_id)
       VALUES (gen_random_uuid(), $1, $2)`,
      [event_id, animal_id]
    );
  }
}

export const eventRepository = new EventRepository();
