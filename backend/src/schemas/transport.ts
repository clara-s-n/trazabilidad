import { Static, Type } from '@sinclair/typebox';

export const TransportParams = Type.Object({
  transport_id: Type.String({ format: 'uuid' }),
});

export type TransportType = Static<typeof TransportParams>;
