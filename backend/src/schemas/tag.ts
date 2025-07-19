import { Static, Type } from '@sinclair/typebox';

export const TagParams = Type.Object({
  id: Type.String(),
});

export type TagType = Static<typeof TagParams>;