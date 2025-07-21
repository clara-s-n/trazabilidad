import { Static, Type } from '@sinclair/typebox';

export const WeighingParams = Type.Object({
    weighing_id: Type.String({ format: 'uuid' }),
});

export const WeighingSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    event_id: Type.String({ format: 'uuid' }),
    weight: Type.Number(),
    unit: Type.String(),
});

export type Weighing = Static<typeof WeighingSchema>;
export type WeighingType = Static<typeof WeighingParams>;