import { query } from "./database.js";
import { User } from "../src/schemas/user.js"

export class UserRepository {
  async doLogin(email: string, password: string): Promise<User | null> {
    const { rows } = await query(
      `SELECT id, email, password_hash, rols_id, created_at, updated_at
        FROM users
        WHERE email = $1 AND password_hash = $2`,
      [email, password]
    );
    return rows[0] as User | null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const { rows } = await query(
      `SELECT id, email, password_hash, rols_id, created_at, updated_at
        FROM users
        WHERE email = $1`,
      [email]
    );
    return rows[0] as User | null;
  }

  async getAllUsers(): Promise<User[]> {
    const { rows } = await query(
      `SELECT id, email, password_hash, rols_id, created_at, updated_at
        FROM users`
    );
    return rows as User[];
  }

  async getUserById(id: string): Promise<User | null> {
    const { rows } = await query(
      `SELECT id, email, password_hash, rols_id, created_at, updated_at
        FROM users
        WHERE id = $1`,
      [id]
    );
    return rows[0] as User | null;
  }

  async createUser(data: { email: string; passwordHash: string; rolsId: string }): Promise<User> {
    const { rows } = await query(
      `INSERT INTO users(id, email, password_hash, rols_id, created_at)
        VALUES (gen_random_uuid(), $1, $2, $3, now())
        RETURNING id, email, password_hash, rols_id, created_at, updated_at`,
      [data.email, data.passwordHash, data.rolsId]
    );
    return rows[0] as User;
  }

  async updateUser(id: string, data: { email?: string; rolsId?: string }): Promise<User | null> {
    const sets: string[] = [];
    const params: any[] = [id];
    if (data.email) {
      params.push(data.email);
      sets.push(`email = $${params.length}`);
    }
    if (data.rolsId) {
      params.push(data.rolsId);
      sets.push(`rols_id = $${params.length}`);
    }
    const { rows } = await query(
      `UPDATE users
        SET ${sets.join(', ')}, updated_at = now()
        WHERE id = $1
        RETURNING id, email, password_hash, rols_id, created_at, updated_at`,
      params
    );
    return rows[0] as User | null;
  }

  async deleteUser(id: string): Promise<void> {
    await query(`DELETE FROM users WHERE id = $1;`, [id]);
  }
}

export const userRepository = new UserRepository();