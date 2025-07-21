import { Static, Type } from '@sinclair/typebox';

export const LandParams = Type.Object({
  land_id: Type.String({ format: 'uuid' }),
});

export const LandSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  latitude: Type.Number(),
  longitude: Type.Number(),
});

export type Land = Static<typeof LandSchema>;
export type LandType = Static<typeof LandParams>;
