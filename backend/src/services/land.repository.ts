import { query } from "./database.js";
import { Land } from "../types/schemas/land.js"

export class LandRepository {
    async createLand(data: { name: string; latitude: number; longitude: number }): Promise<Land> {
        const { rows } = await query(
            `INSERT INTO lands(id,name,latitude,longitude)
            VALUES(gen_random_uuid(),$1,$2,$3) RETURNING *`,
            [data.name,data.latitude,data.longitude]
        ); return rows[0];
    }

    async getAllLands(): Promise<Land[]> {
        const { rows } = await query(`SELECT * FROM lands ORDER BY name`);
        return rows;
    }

    async getLandById(id: string): Promise<Land|null> {
        const { rows } = await query(`SELECT * FROM lands WHERE id=$1`,[id]);
        return rows[0]||null;
    }

    async updateLand(id: string,data: { name?:string; latitude?:number; longitude?:number }): Promise<Land|null> {
        const sets: string[]=[]; const params:any[]=[id];
        if(data.name){params.push(data.name);sets.push(`name=$${params.length}`);}
        if(data.latitude){params.push(data.latitude);sets.push(`latitude=$${params.length}`);}    
        if(data.longitude){params.push(data.longitude);sets.push(`longitude=$${params.length}`);}
        const { rows } = await query(
            `UPDATE lands SET ${sets.join(',')}
            WHERE id=$1 RETURNING *`, params
        ); return rows[0]||null;
    }

    async deleteLand(id: string): Promise<void> {
        await query(`DELETE FROM lands WHERE id=$1`,[id]);
    }
}

export const landRepository = new LandRepository();