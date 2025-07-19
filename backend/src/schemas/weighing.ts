import { Static, Type } from '@sinclair/typebox';

export const WeighingParams = Type.Object({
    ewighing_id: Type.Integer(),
});

export type WeighingType = Static<typeof WeighingParams>;