import { Static, Type } from '@sinclair/typebox';

export const LandParams = Type.Object({
  land_id: Type.String({ format: 'uuid' }),
});

export type LandType = Static<typeof LandParams>;
