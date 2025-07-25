import { Static, Type } from "@sinclair/typebox";

export const WeighingParams = Type.Object({
    weighing_id: Type.String({ format: 'uuid' }),
});

// Esquema de la entidad de pesaje
export const WeighingSchema = Type.Object(
  {
    id:       Type.String({ format: "uuid" }),
    event_id: Type.String({ format: "uuid" }),
    weight:   Type.Number(),
    unit:     Type.String({ default: "kg" })
  },
  {
    examples: [
      {
        id:       "a1b2c3d4-5678-90ab-cdef-1234567890ab",
        event_id: "f1e2d3c4-9876-54ba-fedc-0987654321cd",
        weight:   350.5,
        unit:     "kg"
      }
    ]
  }
);

// Esquema para crear un pesaje
export const CreateWeighingParams = Type.Object({
  event_id: Type.String({ format: "uuid" }),
  weight:   Type.Number({ minimum: 0 })
});
export type CreateWeighingType = Static<typeof CreateWeighingParams>;
export type Weighing = Static<typeof WeighingSchema>;
export type WeighingParams = Static<typeof WeighingParams>;