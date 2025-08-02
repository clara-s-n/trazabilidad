export interface UserPost {
  email: string;
  password: string;
  repeatPassword: string,
  role_id: number;
}

export interface User {
  id: string;
  email: string;
  role_id: number;
}

export interface UserProfile {
  user_id: string;
  email: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserUpdate {
  email?: string;
  password?: string;
  role_id?: number;
}
