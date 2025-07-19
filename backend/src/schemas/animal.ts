import { Static, Type } from '@sinclair/typebox';

export const AnimalParams = Type.Object({
  id: Type.String(),
});

export type AnimalType = Static<typeof AnimalParams>; 