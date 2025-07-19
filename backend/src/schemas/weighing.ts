import { Static, Type } from '@sinclair/typebox';

export const WeighingParams = Type.Object({
    id: Type.String(),
});

export type WeighingType = Static<typeof WeighingParams>;