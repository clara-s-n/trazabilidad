import {Static, Type} from "@sinclair/typebox";

export const VaccinationParams = Type.Object({
    vaccination_id: Type.String({ format: 'uuid' }),
});

export type VaccinationType = Static<typeof VaccinationParams>;
