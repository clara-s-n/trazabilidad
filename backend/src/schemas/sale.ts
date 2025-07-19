import { Static, Type } from '@sinclair/typebox';

export const Sale = Type.Object({
  sale_id: Type.Integer(),
});

export type SaleType = Static<typeof Sale>;
