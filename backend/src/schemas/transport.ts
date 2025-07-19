import { Static, Type } from '@sinclair/typebox';

export const TransportParams = Type.Object({
  id: Type.String(),
});

export type TransportType = Static<typeof TransportParams>;
