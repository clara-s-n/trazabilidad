import { Static, Type } from '@sinclair/typebox';

export const AnimalParams = Type.Object({
  animal_id: Type.Integer(),
});

export type AnimalType = Static<typeof AnimalParams>; 