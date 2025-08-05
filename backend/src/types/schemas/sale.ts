import { Static, Type } from "@sinclair/typebox";

export const SaleParam = Type.Object({
  sale_id: Type.String({ 
    format: "uuid",
    examples: ["3d968525-2eb4-4daf-a148-956a026645c0", "341f316a-f0e7-40c8-8c6e-69fc1cbf30c6"]
  }),
});

export const SaleSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  event_id: Type.String({ format: "uuid" }),
  buyer: Type.String(),
  price: Type.Number(),
  currency: Type.String(),
}, {
  examples: [
    {
      id: "3d968525-2eb4-4daf-a148-956a026645c0",
      event_id: "f1c2d3e4-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
      buyer: "Frigorífico Tacuarembó",
      price: 3250.00,
      currency: "USD"
    },
    {
      id: "341f316a-f0e7-40c8-8c6e-69fc1cbf30c6",
      event_id: "a2d3e4f5-6b7c-5d8e-9f0a-1b2c3d4e5f6a",
      buyer: "Carnicería El Buen Gusto",
      price: 2850.00,
      currency: "USD"
    }
  ]
});

export const CreateSaleParams = Type.Object({
  event_id: Type.String({ 
    format: "uuid",
    examples: ["f1c2d3e4-5a6b-4c7d-8e9f-0a1b2c3d4e5f"]
  }),
  buyer: Type.String({ 
    minLength: 3,
    examples: ["Frigorífico Tacuarembó", "Carnicería El Buen Gusto", "Exportadora Carne Premium"]
  }),
  price: Type.Number({ 
    minimum: 0,
    examples: [3250.00, 2850.00, 4100.00]
  }),
  currency: Type.String({ 
    minLength: 3, 
    maxLength: 4,
    examples: ["USD", "UYU", "EUR"]
  }),
});

export const CreateSaleBody = Type.Object(
  {
    animal_id: Type.String({ 
      format: "uuid",
      examples: ["c2716fad-ffce-4517-ad2e-7415cf80178a", "a8d8d11a-dd42-4524-a7c7-4a2063f5ffb1"]
    }),
    buyer: Type.String({ 
      minLength: 3,
      examples: ["Frigorífico Tacuarembó", "Carnicería El Buen Gusto", "Exportadora Carne Premium"] 
    }),
    price: Type.Number({ 
      minimum: 0,
      examples: [3250.00, 2850.00, 4100.00] 
    }),
    currency: Type.String({ 
      minLength: 3, 
      maxLength: 4,
      examples: ["USD", "UYU", "EUR"]
    }),
    date: Type.String({ 
      format: "date-time",
      examples: ["2023-10-01T10:00:00Z", "2023-10-15T14:30:00Z"]
    }),
    comments: Type.Optional(Type.String({ 
      minLength: 1,
      examples: ["Venta para exportación", "Venta local", "Venta al por mayor"]
    })),
  },
  {
    examples: [
      {
        animal_id: "c2716fad-ffce-4517-ad2e-7415cf80178a",
        buyer: "Frigorífico Tacuarembó",
        price: 3250.00,
        currency: "USD",
        date: "2023-10-01T10:00:00Z",
        comments: "Venta para exportación a Europa",
      },
      {
        animal_id: "a8d8d11a-dd42-4524-a7c7-4a2063f5ffb1",
        buyer: "Carnicería El Buen Gusto",
        price: 2850.00,
        currency: "USD",
        date: "2023-10-15T14:30:00Z",
        comments: "Venta local para carnicería premium",
      },
    ],
  }
);

export type CreateSaleBody = Static<typeof CreateSaleBody>;
export type Sale = Static<typeof SaleSchema>;
export type SaleParamType = Static<typeof SaleParam>;
export type CreateSaleType = Static<typeof CreateSaleParams>;
