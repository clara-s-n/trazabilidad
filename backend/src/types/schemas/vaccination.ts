import { Static, Type } from "@sinclair/typebox";

export const VaccinationParam = Type.Object({
  vaccination_id: Type.String({
    format: "uuid",
    examples: [
      "b8cba824-68a8-4300-bef0-5d37f28d385a",
      "0b952984-746f-4b87-a7c7-ad9061e99a61",
    ],
  }),
});

// Esquema de respuesta / entidad
export const VaccinationSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    event_id: Type.String({ format: "uuid" }),
    vaccine: Type.String(),
    dosage: Type.String(),
    provider: Type.String(),
  },
  {
    examples: [
      {
        id: "b8cba824-68a8-4300-bef0-5d37f28d385a",
        event_id: "a6d7e8f9-0b1c-9a2d-3e4f-5a6b7c8d9e0f",
        vaccine: "Aftosa Oleosa",
        dosage: "2ml",
        provider: "Biogénesis Bagó",
      },
      {
        id: "0b952984-746f-4b87-a7c7-ad9061e99a61",
        event_id: "b7e8f9a0-1c2d-0b3e-4f5a-6b7c8d9e0f1a",
        vaccine: "Brucelosis RB51",
        dosage: "1ml",
        provider: "Zoetis",
      }
    ],
  }
);

// Esquema de body para crear
export const CreateVaccinationParams = Type.Object({
  event_id: Type.String({ 
    format: "uuid",
    examples: ["a6d7e8f9-0b1c-9a2d-3e4f-5a6b7c8d9e0f"] 
  }),
  vaccine: Type.String({ 
    minLength: 1,
    examples: ["Aftosa Oleosa", "Brucelosis RB51", "Carbunco Bacteridiano"]
  }),
  dosage: Type.String({ 
    minLength: 1,
    examples: ["1ml", "2ml", "5ml"] 
  }),
  provider: Type.String({ 
    minLength: 1,
    examples: ["Biogénesis Bagó", "Zoetis", "Colorado"]
  }),
});

export const CreateVaccinationBody = Type.Object(
  {
    animal_id: Type.String({ 
      format: "uuid",
      examples: ["aaab3d4c-5623-491e-a666-f2e9c1d62cf1", "7eb4d619-6c02-4f02-ab7a-3e302a74eff6"] 
    }),
    vaccine: Type.String({ 
      minLength: 1,
      examples: ["Aftosa Oleosa", "Brucelosis RB51", "IBR/BVD"]
    }),
    dosage: Type.String({ 
      minLength: 1,
      examples: ["1ml", "2ml", "5ml"] 
    }),
    provider: Type.String({ 
      minLength: 1,
      examples: ["Biogénesis Bagó", "Zoetis", "Colorado"]
    }),
    date: Type.String({ 
      format: "date-time",
      examples: ["2023-10-01T10:00:00Z", "2023-09-15T09:30:00Z"]
    }),
    comments: Type.Optional(Type.String({ 
      minLength: 1,
      examples: ["Primera dosis", "Refuerzo anual", "Vacunación obligatoria"]
    })),
  },
  {
    examples: [
      {
        animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        vaccine: "Aftosa Oleosa",
        dosage: "2ml",
        provider: "Biogénesis Bagó",
        date: "2023-10-01T10:00:00Z",
        comments: "Vacunación obligatoria campaña oficial",
      },
      {
        animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
        vaccine: "Brucelosis RB51",
        dosage: "1ml",
        provider: "Zoetis",
        date: "2023-09-15T09:30:00Z",
        comments: "Hembra primeriza",
      },
    ],
  }
);

export type CreateVaccinationBody = Static<typeof CreateVaccinationBody>;
export type Vaccination = Static<typeof VaccinationSchema>;
export type CreateVaccinationType = Static<typeof CreateVaccinationParams>;
export type VaccinationParamType = Static<typeof VaccinationParam>;
