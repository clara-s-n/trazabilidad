import { query } from '../services/database';
import { Vaccination } from '../src/schemas/vaccination.js';

export class VaccinationRepository {
    async createVaccination(data: { event_id:string; vaccine:string; dosage:string; provider:string }): Promise<Vaccination> {
        const { rows } = await query(
        `INSERT INTO vaccinations(id,event_id,vaccine,dosage,provider)
        VALUES(gen_random_uuid(),$1,$2,$3,$4) RETURNING *`,
        [data.event_id,data.vaccine,data.dosage,data.provider]
        ); return rows[0];
    }

    async getByEvent(eventId: string): Promise<Vaccination[]> {
        const { rows } = await query(`SELECT * FROM vaccinations WHERE event_id=$1`,[eventId]);
        return rows;
    }
}

export const vaccinationRepository = new VaccinationRepository();