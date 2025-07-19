import { Static, Type } from '@sinclair/typebox';

export const LandParams = Type.Object({
  id: Type.String(),
});

export type LandType = Static<typeof LandParams>;
