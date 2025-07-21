import { query } from "./database.js";
import { Tag } from "../src/schemas/tag.js"

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
}

export const tagRepository = new TagRepository();