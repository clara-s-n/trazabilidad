import { Static, Type } from "@sinclair/typebox";

export const WeighingParams = Type.Object({
  weighing_id: Type.String({
    format: "uuid",
    examples: [
      "241f0df3-3d21-4a7f-b0f4-83d3136dd455",
      "da7bb15f-92f6-4739-9420-5685e45c7caa",
    ],
  }),
});

// Esquema de la entidad de pesaje
export const WeighingSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    event_id: Type.String({ format: "uuid" }),
    weight: Type.Number(),
    unit: Type.String({ default: "kg" }),
  },
  {
    examples: [
      {
        id: "241f0df3-3d21-4a7f-b0f4-83d3136dd455",
        event_id: "b1e2c3d4-5f6a-4b7c-8d9e-0f1a2b3c4d5e",
        weight: 450.5,
        unit: "kg",
      },
      {
        id: "da7bb15f-92f6-4739-9420-5685e45c7caa",
        event_id: "c2f3a4b5-6d7e-5c8b-9a0f-1b2c3d4e5f6a",
        weight: 380.75,
        unit: "kg",
      },
    ],
  }
);

// Esquema para crear un pesaje
export const CreateWeighingParams = Type.Object({
  event_id: Type.String({
    format: "uuid",
    examples: ["b1e2c3d4-5f6a-4b7c-8d9e-0f1a2b3c4d5e"],
  }),
  weight: Type.Number({
    minimum: 0,
    examples: [450.5, 380.75, 520.25],
  }),
});

export const CreateWeighingBody = Type.Object(
  {
    animal_id: Type.String({
      format: "uuid",
      examples: [
        "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      ],
    }),
    weight: Type.Number({
      minimum: 0,
      examples: [450.5, 380.75, 520.25],
    }),
    unit: Type.Optional(
      Type.String({
        default: "kg",
        examples: ["kg", "lb"],
      })
    ),
    date: Type.String({
      format: "date-time",
      examples: ["2023-10-01T10:00:00Z", "2023-11-15T08:30:00Z"],
    }),
    comments: Type.Optional(
      Type.String({
        minLength: 1,
        examples: [
          "Pesaje mensual rutinario",
          "Pesaje pre-vacunación",
          "Control de crecimiento",
        ],
      })
    ),
  },
  {
    examples: [
      {
        animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        weight: 450.5,
        unit: "kg",
        date: "2023-10-01T10:00:00Z",
        comments: "Pesaje mensual rutinario",
      },
      {
        animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
        weight: 380.75,
        unit: "kg",
        date: "2023-11-15T08:30:00Z",
        comments: "Control pre-venta",
      },
    ],
  }
);

export type CreateWeighingBody = Static<typeof CreateWeighingBody>;
export type CreateWeighingType = Static<typeof CreateWeighingParams>;
export type Weighing = Static<typeof WeighingSchema>;
export type WeighingParams = Static<typeof WeighingParams>;
