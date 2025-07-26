import { Static, Type } from "@sinclair/typebox";

export const VaccinationParam = Type.Object({
  vaccination_id: Type.String({
    format: "uuid",
    examples: [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "56b33cc3-6e43-4aac-99cf-a90bc681d583"
    ]
  })
});

// Esquema de respuesta / entidad
export const VaccinationSchema = Type.Object(
  {
    id:       Type.String({ format: "uuid" }),
    event_id: Type.String({ format: "uuid" }),
    vaccine:  Type.String(),
    dosage:   Type.String(),
    provider: Type.String()
  },
  {
    examples: [
      {
        id:       "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        event_id: "5f47ab27-0b45-4e7f-9f53-2b1c9f5d8a78",
        vaccine:  "Brucella",
        dosage:   "2 ml",
        provider: "Veterinaria Pérez"
      }
    ]
  }
);

// Esquema de body para crear
export const CreateVaccinationParams = Type.Object({
  event_id: Type.String({ format: "uuid" }),
  vaccine:  Type.String({ minLength: 1 }),
  dosage:   Type.String({ minLength: 1 }),
  provider: Type.String({ minLength: 1 })
});

export type Vaccination = Static<typeof VaccinationSchema>;
export type CreateVaccinationType = Static<typeof CreateVaccinationParams>;
export type VaccinationParamType = Static<typeof VaccinationParam>;
