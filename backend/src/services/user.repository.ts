import { query } from "./database.js";
import { User } from "../types/schemas/user.js"

export class UserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const { rows } = await query(
      `SELECT id, email, password_hash, role_id, created_at
        FROM users
        WHERE email = $1`,
      [email]
    );
    return rows[0] as User | null;
  }

  async getAllUsers(): Promise<User[]> {
    const { rows } = await query(
      `SELECT id, email, password_hash, role_id, created_at
        FROM users`
    );
    return rows as User[];
  }

  async getUserById(id: string): Promise<User | null> {
    const { rows } = await query(
      `SELECT id, email, password_hash, role_id, created_at
        FROM users
        WHERE id = $1`,
      [id]
    );
    return rows[0] as User | null;
  }

  async createUser(data: { email: string; password_hash: string; role_id: number }): Promise<User> {
    const { rows } = await query(
      `INSERT INTO users(id, email, password_hash, role_id, created_at)
        VALUES (gen_random_uuid(), $1, $2, $3, now())
        RETURNING id, email, password_hash, role_id, created_at`,
      [data.email, data.password_hash, data.role_id]
    );
    return rows[0] as User;
  }

  async updateUser(id: string, data: { email?: string; role_id?: number }): Promise<User | null> {
    const sets: string[] = [];
    const params: any[] = [id];
    if (data.email) {
      params.push(data.email);
      sets.push(`email = $${params.length}`);
    }
    if (typeof data.role_id !== 'undefined') {
      params.push(data.role_id);
      sets.push(`role_id = $${params.length}`);
    }
    const { rows } = await query(
      `UPDATE users
          SET ${sets.join(', ')}, updated_at = now()
          WHERE id = $1
          RETURNING id, email, password_hash, role_id, created_at`,
      params
    );
    return rows[0] as User | null;
  }

  async deleteUser(id: string): Promise<void> {
    await query(`DELETE FROM users WHERE id = $1;`, [id]);
  }
}

export const userRepository = new UserRepository();