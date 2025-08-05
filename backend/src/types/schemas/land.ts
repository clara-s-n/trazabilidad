import { Static, Type } from "@sinclair/typebox";

export const LandParams = Type.Object({
  land_id: Type.String({
    format: "uuid",
    examples: [
      "43666c09-a0b0-4b6b-9558-e44b50a25d57",
      "bf52757b-7a5a-4748-b78f-459471979493",
    ],
  }),
});

export const CreateLandParams = Type.Object(
  {
    name: Type.String({
      minLength: 3,
      description: "Nombre del predio",
      examples: [
        "Estancia San José",
        "Predio La Esperanza",
        "Establecimiento El Trébol",
      ],
    }),
    latitude: Type.Number({
      minimum: -90,
      maximum: 90,
      description: "Latitud (–90 a 90)",
    }),
    longitude: Type.Number({
      minimum: -180,
      maximum: 180,
      description: "Longitud (–180 a 180)",
    }),
  },
  {
    examples: [
      {
        name: "Estancia San José",
        latitude: -34.478611,
        longitude: -56.892778,
      },
      {
        name: "Predio La Esperanza",
        latitude: -33.245667,
        longitude: -57.123456,
      },
    ],
  }
);

export const UpdateLandParams = Type.Partial(
  Type.Object({
    name: Type.String({
      minLength: 3,
      description: "Nombre del predio",
      examples: ["Estancia San José (actualizado)", "Nueva Esperanza"],
    }),
    latitude: Type.Number({
      minimum: -90,
      maximum: 90,
      description: "Latitud (–90 a 90)",
    }),
    longitude: Type.Number({
      minimum: -180,
      maximum: 180,
      description: "Longitud (–180 a 180)",
    }),
  }),
  {
    examples: [
      { name: "Estancia San José (actualizado)" },
      {
        latitude: -34.479,
        longitude: -56.893,
      },
      {
        name: "Nueva Esperanza",
        latitude: -33.246,
        longitude: -57.124,
      },
    ],
  }
);

export const LandSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    latitude: Type.Number(),
    longitude: Type.Number(),
    image_path: Type.Optional(Type.String()),
  },
  {
    examples: [
      {
        id: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
        name: "Estancia San José",
        latitude: -34.478611,
        longitude: -56.892778,
      },
      {
        id: "bf52757b-7a5a-4748-b78f-459471979493",
        name: "Predio La Esperanza",
        latitude: -33.245667,
        longitude: -57.123456,
      },
    ],
  }
);

export type Land = Static<typeof LandSchema>;
export type CreateLandType = Static<typeof CreateLandParams>;
export type UpdateLandType = Static<typeof UpdateLandParams>;
export type LandParamsType = Static<typeof LandParams>;
