import { query } from "./database.js";
import { Sale } from "../schemas/sale.js"


export class SaleRepository {
  async createSale(data: { event_id:string; buyer:string; price:number; currency:string }): Promise<Sale> {
    const { rows } = await query(
      `INSERT INTO sales(id,event_id,buyer,price,currency)
       VALUES(gen_random_uuid(),$1,$2,$3,$4) RETURNING *`,
      [data.event_id,data.buyer,data.price,data.currency]
    ); return rows[0];
  }

  async getByEvent(eventId: string): Promise<Sale[]> {
    const { rows } = await query(`SELECT * FROM sales WHERE event_id=$1`,[eventId]);
    return rows;
  }
}

export const saleRepository = new SaleRepository();