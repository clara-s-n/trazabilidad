import {Static, Type} from "@sinclair/typebox";

export const VaccinationParams = Type.Object({
    vaccination_id: Type.Integer(),
});

export type VaccinationType = Static<typeof VaccinationParams>;
