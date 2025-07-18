import { myPool } from "../services/database.service.js";

export class UsuarioRepository {

  baseQuery = `
    SELECT id_usuario,nombres,roles FROM public.usuarios
  `;

  // Define methods for user repository operations
  async findUserByEmail(email: string): Promise<any> {
    // Logic to find a user by email
    throw new Error("Method not implemented.");
  }

  async getAllUsers(): Promise<any[]> {
    const result = await myPool.query(this.baseQuery);
    return result.rows;
  }

  async getUserById(userId: string): Promise<any> {
    // Logic to get a user by ID
    throw new Error("Method not implemented.");
  }

  async createUser(userData: any): Promise<any> {
    // Logic to create a new user
    throw new Error("Method not implemented.");
  }

  async updateUser(userId: string, updateData: any): Promise<any> {
    // Logic to update user information
    throw new Error("Method not implemented.");
  }

  async deleteUser(userId: string): Promise<void> {
    // Logic to delete a user
    throw new Error("Method not implemented.");
  }

  async auth(nombre: string, clave: string): Promise<any> {

    const query = `${this.baseQuery}
      WHERE nombre = $1 AND clave = $2 AND password_hash = crypt($2, password_hash);
    `;

    const result = await myPool.query(query, [nombre, clave]);

    if (result.rows.length === 0) {
      throw new Error("Usuario o clave incorrectos");
    }

    return result.rows[0];
  }
}
export const usuarioRepository = new UsuarioRepository();