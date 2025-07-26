export interface UserPost {
  email: string;
  password: string;
  repeatPassword: string,
  role_id: number;
}

export interface User {
  user_id: string;
  email: string;
  role_id: number;
}
