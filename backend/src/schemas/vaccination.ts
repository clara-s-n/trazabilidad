import {Static, Type} from "@sinclair/typebox";

export const VaccinationParams = Type.Object({
    vaccination_id: Type.String({ format: 'uuid' }),
});

export const VaccinationSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    event_id: Type.String({ format: 'uuid' }),
    vaccine: Type.String(),
    dosage: Type.String(),
    provider: Type.String(),
});

export type Vaccination = Static<typeof VaccinationSchema>;
export type VaccinationType = Static<typeof VaccinationParams>;
