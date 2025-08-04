import { query } from "./database.js";
import { Tag } from "../types/schemas/tag.js"

export class TagRepository {
    async createTag(data: { tag_number: string }): Promise<Tag> {
        const { rows } = await query(
            `INSERT INTO tags(id,country_code,country_iso,ministry,tag_number,status)
            VALUES(gen_random_uuid(),$1,$2,$3,$4,'active')
            RETURNING *`,
            ['00014', '858', 'MGAP UY', data.tag_number]
        ); return rows[0];
    }

    async getAllTags(): Promise<any[]> {
    const { rows } = await query(`
        SELECT 
          t.*, 
          at.animal_id, 
          a.breed, 
          a.birth_date, 
          a.status as animal_status
        FROM tags t
        LEFT JOIN animal_tag at 
          ON at.tag_id = t.id AND at.unassignment_date IS NULL
        LEFT JOIN animals a
          ON a.id = at.animal_id
        ORDER BY t.tag_number
    `);
    return rows.map(row => ({
        id: row.id,
        country_code: row.country_code,
        country_iso: row.country_iso,
        ministry: row.ministry,
        tag_number: row.tag_number,
        status: row.status,
        animal_id: row.animal_id ?? null,
        animal: row.animal_id
            ? {
                id: row.animal_id, // <-- AGREGA ESTA LÍNEA
                animal_id: row.animal_id,
                breed: row.breed,
                birth_date: row.birth_date,
                status: row.animal_status,
            }
            : undefined,
    }));

}


    async getTagById(id: string): Promise<Tag | null> {
        const { rows } = await query(`SELECT * FROM tags WHERE id=$1`, [id]);
        return rows[0] || null;
    }

    async deactivateTag(id: string): Promise<void> {
        await query(`UPDATE tags SET status='inactive' WHERE id=$1`, [id]);
    }

    async activateTag(id: string): Promise<void> {
        await query(`UPDATE tags SET status='active' WHERE id=$1`, [id]);
    }

    async assignTagToAnimal(animalId: string, tagId: string): Promise<boolean> {
        if (!animalId || !tagId) throw new Error('Faltan parámetros');

        // 1. Verificar si el animal ya tiene una tag activa (sin unassignment_date)
        const res = await query(
            `SELECT 1 FROM animal_tag WHERE animal_id = $1 AND unassignment_date IS NULL`,
            [animalId]
        );
        if ((res.rowCount ?? 0) > 0) {
            // Ya tiene una tag activa
            throw new Error('El animal ya tiene una caravana activa');
        }

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

        try {
            await query('BEGIN');

            // 1. Marcar la asignación como finalizada
            const res = await query(
                `UPDATE animal_tag
                SET unassignment_date = NOW()
                WHERE animal_id = $1 AND tag_id = $2 AND unassignment_date IS NULL`,
                [animalId, tagId]
            );

            // 2. Cambiar el estado de la tag
            await query(
                `UPDATE tags
             SET status = 'retired'
             WHERE id = $1`,
                [tagId]
            );

            await query('COMMIT');
            return (res.rowCount ?? 0) > 0;
        } catch (e) {
            await query('ROLLBACK');
            throw e;
        }
    }

    async getCurrentAnimalByTag(tagId: string): Promise<any | null> {
        const { rows } = await query(
            `SELECT a.*
            FROM animal_tag at
            JOIN animals a ON at.animal_id = a.id
            WHERE at.tag_id = $1
            AND at.unassignment_date IS NULL
            ORDER BY at.assignment_date DESC
            LIMIT 1`,
            [tagId]
        );
        return rows[0] ?? null;
    }


    async changeAnimalTag(
        animalId: string,
        oldTagId: string,
        newTagId: string
    ): Promise<boolean> {
        if (!animalId || !oldTagId || !newTagId) throw new Error('Faltan parámetros');

        try {
            await query('BEGIN');

            // 1. Desasignar la tag antigua
            const res = await query(
                `UPDATE animal_tag
                SET unassignment_date = NOW()
                WHERE animal_id = $1 AND tag_id = $2 AND unassignment_date IS NULL`,
                [animalId, oldTagId]
            );

            // 2. Asignar la nueva tag
            await this.assignTagToAnimal(animalId, newTagId);

            await query('COMMIT');
            return (res.rowCount ?? 0) > 0;
        } catch (e) {
            await query('ROLLBACK');
            throw e;
        }
    }
}


export const tagRepository = new TagRepository();