export interface UserPost {
  email: string;
  password_hash: string;
  role_id: number;
}

export interface User extends UserPost {
  id_usuario: number;
}