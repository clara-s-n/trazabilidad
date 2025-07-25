import { query } from "./database.js";
import { Vaccination } from "../types/schemas/vaccination.js";

export class VaccinationRepository {
  // Crear nueva vacunación
  async createVaccination(data: {
    event_id: string;
    vaccine: string;
    dosage: string;
    provider: string;
  }): Promise<Vaccination> {
    const { rows } = await query(
      `INSERT INTO vaccinations(id, event_id, vaccine, dosage, provider)
       VALUES (gen_random_uuid(), $1, $2, $3, $4)
       RETURNING id, event_id, vaccine, dosage, provider`,
      [data.event_id, data.vaccine, data.dosage, data.provider]
    );
    return rows[0];
  }

  // Obtener todas las vacunaciones de un animal
  async getByAnimal(animalId: string): Promise<Vaccination[]> {
    const { rows } = await query(
      `SELECT v.id, v.event_id, v.vaccine, v.dosage, v.provider
       FROM vaccinations v
       JOIN animal_event ae ON ae.event_id = v.event_id
       JOIN events e         ON e.id         = ae.event_id
       JOIN event_type et    ON et.id        = e.event_type
       WHERE ae.animal_id = $1
         AND et.name = 'Vaccination'`,
      [animalId]
    );
    return rows as Vaccination[];
  }

  // Validar que un event_id pertenezca a una vacunación de este animal
  async getValidVaccinationEvent(
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
         AND et.name = 'Vaccination'
       LIMIT 1`,
      [animalId, eventId]
    );
    return rows.length > 0;
  }
}

export const vaccinationRepository = new VaccinationRepository();