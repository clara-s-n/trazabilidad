/** Parámetros de ruta para operaciones con sale */
export interface SaleParams {
  sale_id: string;
}

export interface SaleCreate {
  animal_id: string;
  buyer: string;
  price: number;
  currency: string;
  date: string;
  comments?: string;
}

export interface Sale {
  id: string;
  event_id: string;
  buyer: string;
  price: number;
  currency: string;
}
