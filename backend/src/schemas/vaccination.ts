import {Static, Type} from "@sinclair/typebox";

export const VaccinationParams = Type.Object({
    id: Type.String(),
});

export type VaccinationType = Static<typeof VaccinationParams>;
