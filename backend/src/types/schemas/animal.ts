import { Static, Type } from '@sinclair/typebox';

export const AnimalParams = Type.Object({
  animal_id: Type.String({
    format: 'uuid',
    examples: [
      'a1f5c3d2-4b6e-11ec-81d3-0242ac130003',
      'b2e6d4f3-5c7f-22fd-92e4-1353bd241114',
      'c3d7e5a4-6d80-33fe-a3e5-2464ce352225',
      'd4e8f6b5-7e91-44af-b4f6-3575df463336',
      'e5f907c6-8fa2-55bg-c5g7-4686eg574447'
    ]
  }),
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