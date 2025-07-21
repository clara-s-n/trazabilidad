import { query } from "./database.js";
import { Transport } from "../schemas/transport.js"

export class TransportRepository {
    async createTransport(data: Transport): Promise<Transport> {
        const { rows } = await query(
            `INSERT INTO transports(id,animal_id,origin_land_id,destiny_land_id,date,details)
            VALUES(gen_random_uuid(),$1,$2,$3,$4,$5) RETURNING *`,
            [data.animal_id,data.origin_land_id,data.destiny_land_id,data.date,data.details]
        ); return rows[0];
    }

    async getByAnimal(animalId: string): Promise<Transport[]> {
        const { rows } = await query(`SELECT * FROM transports WHERE animal_id=$1`,[animalId]);
        return rows;
    }
}

export const transportRepository = new TransportRepository();