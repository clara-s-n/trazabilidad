import { query } from "./database.js";
import { Land } from "../types/schemas/land.js";
import { Animal } from "../types/schemas/animal.js";
import { UCUErrorBadRequest } from "../utils/index.js";

export class LandRepository {
  async createLand(data: {
    name: string;
    latitude: number;
    longitude: number;
  }): Promise<Land> {
    try {
      const { rows } = await query(
        `INSERT INTO lands(id,name,latitude,longitude)
                VALUES(gen_random_uuid(),$1,$2,$3) RETURNING *`,
        [data.name, data.latitude, data.longitude]
      );
      return rows[0];
    } catch (error: any) {
      if (error.code === "23505" && error.constraint === "unique_land_name") {
        throw new UCUErrorBadRequest(
          `Ya existe un predio con el nombre "${data.name}"`
        );
      }
      throw error;
    }
  }

  async getAllLands(): Promise<Land[]> {
    const { rows } = await query(`
    SELECT 
      id,
      name,
      latitude::float8 AS latitude,
      longitude::float8 AS longitude
    FROM lands
    ORDER BY name
  `);
    return rows; // latitude/longitude ya son numbers
  }

  async getLandById(id: string): Promise<Land | null> {
    const { rows } = await query(`SELECT * FROM lands WHERE id=$1`, [id]);
    return rows[0] || null;
  }

  async updateLand(
    id: string,
    data: {
      name?: string;
      latitude?: number;
      longitude?: number;
      image_path?: string;
    }
  ): Promise<Land | null> {
    try {
      const sets: string[] = [];
      const params: any[] = [id];
      if (data.name) {
        params.push(data.name);
        sets.push(`name=$${params.length}`);
      }
      if (data.latitude) {
        params.push(data.latitude);
        sets.push(`latitude=$${params.length}`);
      }
      if (data.longitude) {
        params.push(data.longitude);
        sets.push(`longitude=$${params.length}`);
      }
      if (data.image_path !== undefined) {
        params.push(data.image_path);
        sets.push(`image_path=$${params.length}`);
      }
      const { rows } = await query(
        `UPDATE lands SET ${sets.join(",")}
                WHERE id=$1 RETURNING *`,
        params
      );
      return rows[0] || null;
    } catch (error: any) {
      if (error.code === "23505" && error.constraint === "unique_land_name") {
        throw new UCUErrorBadRequest(
          `Ya existe un predio con el nombre "${data.name}"`
        );
      }
      throw error;
    }
  }

  async deleteLand(id: string): Promise<boolean> {
    const result = await query(`DELETE FROM lands WHERE id=$1`, [id]);
    if (result.rowCount === null) {
      return false;
    }
    return result.rowCount > 0;
  }

  async getAnimalsByLandId(id: string): Promise<Animal[]> {
    const { rows } = await query(
      `
          SELECT a.id, a.breed, a.birth_date, a.owner_id, a.land_id, a.status, a.created_at, a.updated_at
          FROM animals a
          WHERE a.land_id = $1
          ORDER BY a.birth_date DESC;
        `,
      [id]
    );
    return rows;
  }
}

export const landRepository = new LandRepository();
