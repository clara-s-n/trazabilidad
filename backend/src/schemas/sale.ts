import { Static, Type } from '@sinclair/typebox';

export const Sale = Type.Object({
  id: Type.String(),
});

export type SaleType = Static<typeof Sale>;
