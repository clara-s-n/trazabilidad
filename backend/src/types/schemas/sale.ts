import { Static, Type } from "@sinclair/typebox";

export const SaleParam = Type.Object({
  sale_id: Type.String({ format: "uuid" }),
});

export const SaleSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  event_id: Type.String({ format: "uuid" }),
  buyer: Type.String(),
  price: Type.Number(),
  currency: Type.String(),
});

export const CreateSaleParams = Type.Object({
  event_id: Type.String({ format: "uuid" }),
  buyer: Type.String({ minLength: 3 }),
  price: Type.Number({ minimum: 0 }),
  currency: Type.String({ minLength: 3, maxLength: 4 }), // Ej: USD, UYU
});

export const CreateSaleBody = Type.Object(
  {
    animal_id: Type.String({ format: "uuid" }),
    buyer: Type.String({ minLength: 3 }),
    price: Type.Number({ minimum: 0 }),
    currency: Type.String({ minLength: 3, maxLength: 4 }),
    date: Type.String({ format: "date-time" }),
    comments: Type.Optional(Type.String({ minLength: 1 })),
  },
  {
    examples: [
      {
        animal_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        buyer: "Juan Pérez",
        price: 1500,
        currency: "USD",
        date: "2023-10-01T10:00:00Z",
        comments: "Venta mensual",
      },
    ],
  }
);

export type CreateSaleBody = Static<typeof CreateSaleBody>;
export type Sale = Static<typeof SaleSchema>;
export type SaleParamType = Static<typeof SaleParam>;
export type CreateSaleType = Static<typeof CreateSaleParams>;
