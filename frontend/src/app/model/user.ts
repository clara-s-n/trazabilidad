export interface UserPost {
  email: string;
  password: string;
  repeatPassword: string,
  role_id: number;
}

export interface User extends UserPost {
  id_usuario: number;
}