// Interfaz para el payload del JWT
export interface JWTPayload {
  user_id: string;
  user: string;
  role_id: number;
  exp?: number;
  iat?: number;
}