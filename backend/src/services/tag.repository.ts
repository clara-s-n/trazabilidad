import { query } from "./database.js";
import { Tag } from "../types/schemas/tag.js"

export class TagRepository {
    async createTag(data: { tag_number: string }): Promise<Tag> {
        const { rows } = await query(
            `INSERT INTO tags(id,country_code,country_iso,ministry,tag_number,status)
            VALUES(gen_random_uuid(),$1,$2,$3,$4,'active')
            RETURNING *`,
            ['00014','858','MGAP UY',data.tag_number]
        ); return rows[0];
    }

    async getAllTags(): Promise<Tag[]> {
        const { rows } = await query(`SELECT * FROM tags ORDER BY tag_number`);
        return rows;
    }

    async getTagById(id: string): Promise<Tag|null> {
        const { rows } = await query(`SELECT * FROM tags WHERE id=$1`,[id]);
        return rows[0]||null;
    }
    
    async deactivateTag(id: string): Promise<void> {
        await query(`UPDATE tags SET status='inactive' WHERE id=$1`,[id]);
    }
    
    async assignTagToAnimal(animalId: string, tagId: string): Promise<boolean> {
        if (!animalId || !tagId) throw new Error('Faltan parámetros');

        // 1. Check existencia
        const res = await query(
        'SELECT 1 FROM animal_tag WHERE animal_id = $1 AND tag_id = $2',
        [animalId, tagId]
        );
        if ((res.rowCount ?? 0) > 0) return false;

        // 2. Insertar relación
        await query(
        'INSERT INTO animal_tag (id, animal_id, tag_id, assignment_date) VALUES (gen_random_uuid(), $1, $2, now())',
        [animalId, tagId]
        );
        return true;
    }

    /**
     * Obtiene los tags de un animal.
     * @param animalId - ID del animal
     * @returns Promise<{id: string, nombre: string}[]> - Lista de tags
     */
    async getTagsByAnimal(animalId: string): Promise<string[]> {
        if (!animalId) throw new Error('El parámetro animalId es requerido');

        const result = await query(
        `
        SELECT * FROM animal_tag 
        WHERE animal_id = $1
        ORDER BY assignment_date ASC
        `,
        [animalId]
        );
        return result.rows;
    }

    async unassignTagFromAnimal(animalId: string, tagId: string): Promise<boolean> {
        if (!animalId || !tagId) throw new Error('Faltan parámetros');

        const res = await query(
        `
        UPDATE animal_tag
        SET unassignment_date = NOW()
        WHERE animal_id = $1 AND tag_id = $2 AND unassignment_date IS NULL
        `,
        [animalId, tagId]
        );
        return ((res.rowCount ?? 0) > 0);
    }

    async getCurrentTagByAnimal(animalId: string): Promise<any | null> {
  const { rows } = await query(
    `
    SELECT t.id, t.tag_number, t.status, t.country_code, t.country_iso, t.ministry
    FROM animal_tag at
    JOIN tags t ON at.tag_id = t.id
    WHERE at.animal_id = $1
      AND at.unassignment_date IS NULL
    ORDER BY at.assignment_date DESC
    LIMIT 1
    `,
    [animalId]
  );
  return rows[0] ?? null;
}
}


export const tagRepository = new TagRepository();