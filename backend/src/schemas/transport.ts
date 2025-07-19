import { Static, Type } from '@sinclair/typebox';

export const TransportParams = Type.Object({
  transport_id: Type.Integer(),
});

export type TransportType = Static<typeof TransportParams>;
