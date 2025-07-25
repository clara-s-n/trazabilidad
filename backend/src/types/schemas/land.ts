import { Static, Type } from "@sinclair/typebox";

export const LandParams = Type.Object({
  land_id: Type.String({ format: "uuid" }),
});

export const CreateLandParams = Type.Object({
  name: Type.String({ minLength: 3, description: "Nombre del predio" }),
  latitude: Type.Number({
    minimum: -90,
    maximum: 90,
    description: "Latitud (–90 a 90)"
  }),
  longitude: Type.Number({
    minimum: -180,
    maximum: 180,
    description: "Longitud (–180 a 180)"
  })
});

export const UpdateLandParams = Type.Partial(
  Type.Object({
    name: Type.String({ minLength: 3, description: "Nombre del predio" }),
    latitude: Type.Number({
      minimum: -90, maximum: 90, description: "Latitud (–90 a 90)"
    }),
    longitude: Type.Number({
      minimum: -180, maximum: 180, description: "Longitud (–180 a 180)"
    }),
  })
);


export const LandSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  name: Type.String(),
  latitude: Type.Number(),
  longitude: Type.Number()
});

export type Land = Static<typeof LandSchema>;
export type CreateLandType = Static<typeof CreateLandParams>;
export type UpdateLandType = Static<typeof UpdateLandParams>;
export type LandParamsType = Static<typeof LandParams>;