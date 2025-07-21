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

export type Sale = Static<typeof SaleSchema>;
export type SaleParamType = Static<typeof SaleParam>;
