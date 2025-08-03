import { query } from "./database.js";
import {
  Animal,
  AnimalDetailed,
  AnimalEvent,
} from "../types/schemas/animal.js";

export class AnimalRepository {
  async createAnimal(data: {
    breed: string;
    birth_date: string;
    owner_id: string;
    land_id: string;
    status: "alive" | "deceased" | "robbed" | "lost";
  }): Promise<Animal> {
    const { rows } = await query(
      `INSERT INTO animals(id, breed, birth_date, owner_id, land_id, status, created_at, updated_at)
            VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, now(), now())
            RETURNING id, breed, birth_date, owner_id, land_id, status, created_at, updated_at`,
      [data.breed, data.birth_date, data.owner_id, data.land_id, data.status]
    );
    return rows[0] as Animal;
  }

  async getById(id: string): Promise<AnimalDetailed> {
    const { rows } = await query(
      `
            SELECT 
                a.*,
                json_build_object('id', l.id, 'name', l.name) AS land,
                coalesce(
                json_agg(
                    json_build_object(
                    'id',       e.id,
                    'type',     et.name,
                    'date',     e.date,
                    'comments', e.comments
                    ) ORDER BY e.date
                ) FILTER (WHERE e.id IS NOT NULL),
                '[]'
                ) AS events
            FROM animals a
            LEFT JOIN lands l ON a.land_id = l.id
            LEFT JOIN animal_event ae ON ae.animal_id = a.id
            LEFT JOIN events e ON ae.event_id = e.id
            LEFT JOIN event_type et ON e.event_type = et.id
            WHERE a.id = $1
            GROUP BY a.id, l.id
            `,
      [id]
    );
    return rows[0];
  }

  async getByOwner(ownerId: string): Promise<Animal[]> {
    const { rows } = await query(
      `SELECT id, breed, birth_date, owner_id, land_id, status, created_at, updated_at
            FROM animals
            WHERE owner_id = $1
            ORDER BY updated_at DESC`,
      [ownerId]
    );
    return rows as Animal[];
  }

  async getAnimalHistory(animalId: string): Promise<any[]> {
    const { rows } = await query(
      `SELECT * FROM animal_history
            WHERE animal_id = $1
            ORDER BY modification_date DESC`,
      [animalId]
    );
    return rows;
  }

  async filter(filters: {
    breed?: string;
    landId?: string;
    dateRange?: string; // '{2023-01-01,2023-12-31}'::tstzrange
  }): Promise<Animal[]> {
    const { breed, landId, dateRange } = filters;
    const { rows } = await query(
      `SELECT id, breed, birth_date, owner_id, land_id, status, created_at, updated_at
            FROM animals
            WHERE ($1::text IS NULL OR breed ILIKE $1)
            AND ($2::uuid IS NULL OR land_id = $2)
            AND ($3::tstzrange IS NULL OR updated_at <@ $3)
            ORDER BY updated_at DESC`,
      [breed ?? "null", landId ?? "null", dateRange ?? "null"]
    );
    return rows as Animal[];
  }

  async getAll(): Promise<Animal[]> {
    const { rows } = await query(
      `SELECT id, breed, birth_date, owner_id, land_id, status, created_at, updated_at
            FROM animals`
    );
    return rows as Animal[];
  }

  async getAnimalEvents(animalId: string): Promise<AnimalEvent[]> {
    const { rows } = await query(
      `
      SELECT
        e.id,
        et.name    AS type,
        e.date,
        e.comments
      FROM animal_event ae
      JOIN events     e  ON ae.event_id   = e.id
      JOIN event_type et ON e.event_type = et.id
      WHERE ae.animal_id = $1
      ORDER BY e.date DESC
      `,
      [animalId]
    );

    return rows as AnimalEvent[];
  }

  async updateAnimal(
    id: string,
    data: {
      breed?: string;
      birth_date?: string;
      owner_id?: string;
      land_id?: string;
      status?: string;
    }
  ): Promise<Animal | null> {
    const sets: string[] = [];
    const params: any[] = [id];
    if (data.breed) {
      params.push(data.breed);
      sets.push(`breed = $${params.length}`);
    }
    if (data.birth_date) {
      params.push(data.birth_date);
      sets.push(`birth_date = $${params.length}`);
    }
    if (data.owner_id) {
      params.push(data.owner_id);
      sets.push(`owner_id = $${params.length}`);
    }
    if (data.land_id) {
      params.push(data.land_id);
      sets.push(`land_id = $${params.length}`);
    }
    if (data.status) {
      params.push(data.status);
      sets.push(`status = $${params.length}`);
    }
    const { rows } = await query(
      `UPDATE animals
              SET ${sets.join(", ")}
              WHERE id = $1
              RETURNING id, breed, birth_date, owner_id, land_id, status`,
      params
    );
    return rows[0] as Animal | null;
  }

  async getByIdWithTag(id: string): Promise<AnimalDetailed> {
    const { rows } = await query(
    `
      SELECT 
        a.*,
        json_build_object('id', l.id, 'name', l.name) AS land,
        (
          SELECT json_build_object(
            'id', t.id,
            'assignment_date', at.assignment_date
          )
          FROM animal_tag at
          JOIN tags t ON at.tag_id = t.id
          WHERE at.animal_id = a.id
            AND at.unassignment_date IS NULL
          ORDER BY at.assignment_date DESC
          LIMIT 1
        ) AS current_tag,
        coalesce(
          json_agg(
            json_build_object(
              'id',       e.id,
              'type',     et.name,
              'date',     e.date,
              'comments', e.comments
            ) ORDER BY e.date
          ) FILTER (WHERE e.id IS NOT NULL),
          '[]'
        ) AS events
      FROM animals a
      LEFT JOIN lands l ON a.land_id = l.id
      LEFT JOIN animal_event ae ON ae.animal_id = a.id
      LEFT JOIN events e ON ae.event_id = e.id
      LEFT JOIN event_type et ON e.event_type = et.id
      WHERE a.id = $1
      GROUP BY a.id, l.id
    `, [id] );
    return rows[0];
  }
  
}

export const animalRepository = new AnimalRepository();
