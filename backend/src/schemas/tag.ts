import { Static, Type } from '@sinclair/typebox';

export const TagParams = Type.Object({
  tag_id: Type.String({ format: 'uuid' }),
});

export type TagType = Static<typeof TagParams>;