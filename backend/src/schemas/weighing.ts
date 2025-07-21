import { Static, Type } from '@sinclair/typebox';

export const WeighingParams = Type.Object({
    weighing_id: Type.String({ format: 'uuid' }),
});

export type WeighingType = Static<typeof WeighingParams>;