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

export const Animal = Type.Object({
  id: Type.String({ format: 'uuid', examples: ['0a553254-e85c-4780-8995-34098a788256'] }),
  breed: Type.String({ examples: ['Abigar'] }),
  birth_date: Type.String({ format: 'date', examples: ['2020-01-01'] }),
  owner_id: Type.String({ format: 'uuid', examples: ['56b33cc3-6e43-4aac-99cf-a90bc681d583'] }),
  land_id: Type.String({ format: 'uuid', examples: ['ca751bd3-3df5-4967-8282-252ac89543ba'] }),
  status: Type.Union([
    Type.Literal('alive'),
    Type.Literal('deceased'),
    Type.Literal('robbed'),
    Type.Literal('lost'),
  ], { default: 'alive', examples: ['alive', 'deceased', 'robbed', 'lost'] }),
  created_at: Type.String({ format: 'date-time' , examples: ['2020-01-01T00:00:00Z'] }),
  updated_at: Type.String({ format: 'date-time' }),
});

export const AnimalFilter = Type.Object({
  breed: Type.Optional(Type.String({ minLength: 1, examples: ['Abigar', 'Aberdeen Angus'] })),
  landId: Type.Optional(Type.String({ format: 'uuid', examples: ['ca751bd3-3df5-4967-8282-252ac89543ba'] })),
  dateRange: Type.Optional(
    Type.String({ pattern: '^\\{\\d{4}-\\d{2}-\\d{2},\\d{4}-\\d{2}-\\d{2}\\}$', examples: ['{2020-01-01,2020-12-31}'] })
  ),
});

export type AnimalFilter = Static<typeof AnimalFilter>;
export type Animal = Static<typeof Animal>;
export type AnimalParams = Static<typeof AnimalParams>;