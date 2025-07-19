import { Static, Type } from '@sinclair/typebox';

export const Ventas = Type.Object({
  id: Type.String(),
});

export type VentasType = Static<typeof Ventas>;
