import { Static, Type } from '@sinclair/typebox';

export const PredioParams = Type.Object({
  id: Type.String(),
});

export type PredioType = Static<typeof PredioParams>;
