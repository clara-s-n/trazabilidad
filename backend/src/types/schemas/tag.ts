import { Static, Type } from '@sinclair/typebox';

export const TagParams = Type.Object({
  tag_id: Type.String({ format: 'uuid' }),
});

export const TagSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  country_code: Type.String(),
  country_iso: Type.String(),
  ministry: Type.String(),
  tag_number: Type.String(),
  status: Type.Union([
    Type.Literal('active'),
    Type.Literal('inactive'),
    Type.Literal('retired'),
  ]),
});

export type Tag = Static<typeof TagSchema>;
export type TagType = Static<typeof TagParams>;