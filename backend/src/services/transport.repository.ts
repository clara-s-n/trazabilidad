import { query } from "./database.js";
import { Transport } from "../types/schemas/transport.js";

export class TransportRepository {
  async createTransport(data: {
    animal_id: string;
    origin_land_id: string;
    destiny_land_id: string;
    date: string;
    details: string;
  }): Promise<Transport> {
    const { rows } = await query(
      `INSERT INTO transports(id, animal_id, origin_land_id, destiny_land_id, date, details)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.animal_id,
        data.origin_land_id,
        data.destiny_land_id,
        data.date,
        data.details,
      ]
    );
    return rows[0];
  }

  async getAllTransports(): Promise<Transport[]> {
    const { rows } = await query(`
      SELECT
        id,
        animal_id,
        origin_land_id,
        destiny_land_id,
        date,
        details
      FROM transports
      ORDER BY date DESC
    `);
    return rows;
  }

  async getTransportById(id: string): Promise<Transport | null> {
    const { rows } = await query(`SELECT * FROM transports WHERE id = $1`, [id]);
    return rows[0] || null;
  }

  async updateTransport(
    id: string,
    data: {
      animal_id?: string;
      origin_land_id?: string;
      destiny_land_id?: string;
      date?: string;
      details?: string;
    }
  ): Promise<Transport | null> {
    const sets: string[] = [];
    const params: any[] = [id];

    if (data.animal_id) {
      params.push(data.animal_id);
      sets.push(`animal_id = $${params.length}`);
    }
    if (data.origin_land_id) {
      params.push(data.origin_land_id);
      sets.push(`origin_land_id = $${params.length}`);
    }
    if (data.destiny_land_id) {
      params.push(data.destiny_land_id);
      sets.push(`destiny_land_id = $${params.length}`);
    }
    if (data.date) {
      params.push(data.date);
      sets.push(`date = $${params.length}`);
    }
    if (data.details) {
      params.push(data.details);
      sets.push(`details = $${params.length}`);
    }

    const { rows } = await query(
      `UPDATE transports SET ${sets.join(", ")}
       WHERE id = $1 RETURNING *`,
      params
    );
    return rows[0] || null;
  }

  async deleteTransport(id: string): Promise<void> {
    await query(`DELETE FROM transports WHERE id = $1`, [id]);
  }
}

export const transportRepository = new TransportRepository();   