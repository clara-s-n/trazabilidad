import { Static, Type } from '@sinclair/typebox';

export const AnimalParams = Type.Object({
  animal_id: Type.String({ format: 'uuid' }),
});

export const Animal = Type.Object({
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

export const AnimalPost = Type.Object({
  breed: Type.String({ examples: ['Abigar'] }),
  birth_date: Type.String({ format: 'date', examples: ['2020-01-01'] }),
  owner_id: Type.String({ format: 'uuid', examples: ['3600e259-0cc1-491d-9860-aa4cff12155c'] }),
  land_id: Type.String({ format: 'uuid', examples: ['ca751bd3-3df5-4967-8282-252ac89543ba'] }),
  status: Type.Union([
    Type.Literal('alive'),
    Type.Literal('deceased'),
    Type.Literal('robbed'),
    Type.Literal('lost'),
  ], { default: 'alive', examples: ['alive', 'deceased', 'robbed', 'lost'] }),
});

export type AnimalPost = Static<typeof AnimalPost>;
export type Animal = Static<typeof Animal>;
export type AnimalParamsType = Static<typeof AnimalParams>;