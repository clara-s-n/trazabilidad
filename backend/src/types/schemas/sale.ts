import { Static, Type } from '@sinclair/typebox';

export const SaleParam = Type.Object({
  sale_id: Type.String({ format: 'uuid' }),
});

export const SaleSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  event_id: Type.String({ format: 'uuid' }),
  buyer: Type.String(),
  price: Type.Number(),
  currency: Type.String(),
});

export const CreateSaleParams = Type.Object({
  event_id: Type.String({ format: "uuid" }),
  buyer: Type.String({ minLength: 3 }),
  price: Type.Number({ minimum: 0 }),
  currency: Type.String({ minLength: 3, maxLength: 4 }) // Ej: USD, UYU
});

export type Sale = Static<typeof SaleSchema>;
export type SaleParamType = Static<typeof SaleParam>;
export type CreateSaleType = Static<typeof CreateSaleParams>;
