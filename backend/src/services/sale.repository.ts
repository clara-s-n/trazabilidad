import { query } from "./database.js";
import { Sale } from "../types/schemas/sale.js"


export class SaleRepository {
  async createSale(data: { event_id: string; buyer: string; price: number; currency: string }): Promise<Sale> {
    const { rows } = await query(
      `INSERT INTO sales(id,event_id,buyer,price,currency)
       VALUES(gen_random_uuid(),$1,$2,$3,$4) RETURNING *`,
      [data.event_id, data.buyer, data.price, data.currency]
    ); return rows[0];
  }

  async getByEvent(eventId: string): Promise<Sale[]> {
    const { rows } = await query(`SELECT * FROM sales WHERE event_id=$1`, [eventId]);
    return rows;
  }

  async getByAnimal(animalId: string): Promise<Sale[]> {
    const { rows } = await query(`
      SELECT s.*
      FROM sales s
      JOIN animal_event ae ON ae.event_id = s.event_id
      WHERE ae.animal_id = $1
    `, [animalId]);
    return rows as Sale[];
  }

  async getValidSaleEvent(animalId: string, eventId: string): Promise<boolean> {
    const { rows } = await query(`
    SELECT 1
    FROM animal_event ae
    JOIN events e ON e.id = ae.event_id
    JOIN event_type et ON et.id = e.event_type
    WHERE ae.animal_id = $1 AND ae.event_id = $2 AND et.name = 'Sale'
    LIMIT 1;
  `, [animalId, eventId]);
    return rows.length > 0;
  }
}

export const saleRepository = new SaleRepository();