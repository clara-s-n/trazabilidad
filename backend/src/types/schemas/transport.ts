import { Static, Type } from "@sinclair/typebox";

export const TransportParams = Type.Object({
  transport_id: Type.String({
    format: "uuid",
    examples: [
      "a3028cba-47ba-4ffc-a5cf-0aa620f8c463",
      "e1f050fc-7f84-4efa-abd6-468de4cb5e0e",
    ],
  }),
});

export const TransportSchema = Type.Object(
  {
    id: Type.String({ 
      format: "uuid",
      examples: [
        "a3028cba-47ba-4ffc-a5cf-0aa620f8c463",
        "e1f050fc-7f84-4efa-abd6-468de4cb5e0e"
      ] 
    }),
    animal_id: Type.String({ 
      format: "uuid",
      examples: [
        "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        "7eb4d619-6c02-4f02-ab7a-3e302a74eff6"
      ] 
    }),
    origin_land_id: Type.String({ 
      format: "uuid",
      examples: [
        "43666c09-a0b0-4b6b-9558-e44b50a25d57",
        "bf52757b-7a5a-4748-b78f-459471979493"
      ]
    }),
    destiny_land_id: Type.String({ 
      format: "uuid",
      examples: [
        "bf52757b-7a5a-4748-b78f-459471979493",
        "584630da-cc70-40dd-9599-aa539d788894"
      ] 
    }),
    date: Type.String({ 
      format: "date-time",
      examples: ["2023-09-15T08:30:00Z", "2023-09-18T10:15:00Z"]
    }),
    details: Type.String({
      examples: ["Transporte para cambio de potrero", "Movimiento por sequía"]
    }),
  },
  {
    examples: [
      {
        id: "a3028cba-47ba-4ffc-a5cf-0aa620f8c463",
        animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        origin_land_id: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
        destiny_land_id: "bf52757b-7a5a-4748-b78f-459471979493",
        date: "2023-09-15T08:30:00Z",
        details: "Transporte para cambio de potrero",
      },
      {
        id: "e1f050fc-7f84-4efa-abd6-468de4cb5e0e",
        animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
        origin_land_id: "bf52757b-7a5a-4748-b78f-459471979493",
        destiny_land_id: "584630da-cc70-40dd-9599-aa539d788894",
        date: "2023-09-18T10:15:00Z",
        details: "Movimiento por sequía",
      },
    ],
  }
);

export const CreateTransportSchema = Type.Object(
  {
    animal_id: Type.String({
      format: "uuid",
      examples: [
        "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      ],
    }),
    origin_land_id: Type.String({
      format: "uuid",
      examples: [
        "a1234567-1234-1234-1234-123456789012",
        "b2345678-2345-2345-2345-234567890123",
      ],
    }),
    destiny_land_id: Type.String({
      format: "uuid",
      examples: [
        "b2345678-2345-2345-2345-234567890123",
        "c3456789-3456-3456-3456-345678901234",
      ],
    }),
    date: Type.String({
      format: "date-time",
      examples: ["2023-09-15T08:30:00Z", "2023-09-18T10:15:00Z"],
    }),
    details: Type.String({
      minLength: 1,
      examples: [
        "Transporte para cambio de potrero",
        "Movimiento por sequía",
        "Cambio de establecimiento",
        "Rotación de pastoreo",
      ],
    }),
  },
  {
    examples: [
      {
        animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
        origin_land_id: "a1234567-1234-1234-1234-123456789012",
        destiny_land_id: "b2345678-2345-2345-2345-234567890123",
        date: "2023-09-15T08:30:00Z",
        details: "Transporte para cambio de potrero",
      },
      {
        animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
        origin_land_id: "b2345678-2345-2345-2345-234567890123",
        destiny_land_id: "c3456789-3456-3456-3456-345678901234",
        date: "2023-09-18T10:15:00Z",
        details: "Movimiento por sequía",
      },
    ],
  }
);
export type CreateTransportType = Static<typeof CreateTransportSchema>;

export const UpdateTransportSchema = CreateTransportSchema;
export type UpdateTransportType = Static<typeof UpdateTransportSchema>;

export type Transport = Static<typeof TransportSchema>;
export type TransportType = Static<typeof TransportParams>;
