import { Static, Type } from '@sinclair/typebox';

export const AnimalParams = Type.Object({
  animal_id: Type.String({
    format: 'uuid',
    examples: [
      '56b33cc3-6e43-4aac-99cf-a90bc681d583',
      'b2e6d4f3-5c7f-22fd-92e4-1353bd241114',
      'c3d7e5a4-6d80-33fe-a3e5-2464ce352225',
      'd4e8f6b5-7e91-44af-b4f6-3575df463336',
      '2688b6cb-5333-4309-a5d1-53871d342d85'
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