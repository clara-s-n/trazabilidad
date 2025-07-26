import { Static, Type } from '@sinclair/typebox';

export const TransportParams = Type.Object({
  transport_id: Type.String({ format: 'uuid' }),
});

export const TransportSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  animal_id: Type.String({ format: 'uuid' }),
  origin_land_id: Type.String({ format: 'uuid' }),
  destiny_land_id: Type.String({ format: 'uuid' }),
  date: Type.String({ format: 'date-time' }),
  details: Type.String(),
});

export const CreateTransportSchema = Type.Object({
  animal_id:       Type.String({ format: 'uuid' }),
  origin_land_id:  Type.String({ format: 'uuid' }),
  destiny_land_id: Type.String({ format: 'uuid' }),
  date:            Type.String({ format: 'date-time' }),
  details:         Type.String({ minLength: 1 }),
});
export type CreateTransportType = Static<typeof CreateTransportSchema>;

export const UpdateTransportSchema = (CreateTransportSchema);
export type UpdateTransportType = Static<typeof UpdateTransportSchema>;

export type Transport = Static<typeof TransportSchema>;
export type TransportType = Static<typeof TransportParams>;
