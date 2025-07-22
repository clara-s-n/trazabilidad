import { Weighing } from '../types/schemas/weighing.js';
import { query } from './database.js';

export class WeighingRepository {
    async createWeighing(data: { event_id:string; weight:number }): Promise<Weighing> {
        const { rows } = await query(
        `INSERT INTO weightings(id,event_id,weight,unit)
        VALUES(gen_random_uuid(),$1,$2,'kg') RETURNING *`,
        [data.event_id,data.weight]
        ); return rows[0];
    }
    
    async getByEvent(eventId: string): Promise<Weighing[]> {
        const { rows } = await query(`SELECT * FROM weightings WHERE event_id=$1`,[eventId]);
        return rows;
    }
}
export const weighingRepository = new WeighingRepository();