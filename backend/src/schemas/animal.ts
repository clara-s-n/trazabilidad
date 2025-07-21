import { Static, Type } from '@sinclair/typebox';

export const AnimalParams = Type.Object({
  animal_id: Type.String({ format: 'uuid' }),
});

export const AnimalSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  breed: Type.String(),
  birth_date: Type.String({ format: 'date' }),
  owner_id: Type.String({ format: 'uuid' }),
  land_id: Type.String({ format: 'uuid' }),
  status: Type.Union([
    Type.Literal('alive'),
    Type.Literal('deceased'),
    Type.Literal('robbed'),
    Type.Literal('lost'),
  ]),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' }),
});

export type Animal = Static<typeof AnimalSchema>;
export type AnimalParamsType = Static<typeof AnimalParams>;