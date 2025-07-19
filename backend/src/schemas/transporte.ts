import { Static, Type } from '@sinclair/typebox';

export const TransporteParams = Type.Object({
  id: Type.String(),
});

export type TransporteType = Static<typeof TransporteParams>;
