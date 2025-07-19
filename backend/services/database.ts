import pg from "pg";

// Crear una nueva instancia de Pool de pg
export const pool = new pg.Pool();

export const query = async (
  text: string,
  params?: (string | number | string[] | number[] | boolean)[]
) => {
  const res = await pool.query(text, params);
  return res;
};