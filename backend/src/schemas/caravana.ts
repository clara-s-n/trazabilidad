import { Static, Type } from '@sinclair/typebox';

export const CaravanaParams = Type.Object({
  id: Type.String(),
});

export type CaravanaType = Static<typeof CaravanaParams>;