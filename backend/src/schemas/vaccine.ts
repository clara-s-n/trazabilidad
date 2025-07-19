import {Static, Type} from "@sinclair/typebox";

export const VaccineParams = Type.Object({
    id: Type.String(),
});

export type VaccineType = Static<typeof VaccineParams>;
