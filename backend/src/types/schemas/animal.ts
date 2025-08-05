import { Static, Type } from "@sinclair/typebox";
import { UserResponseSchema } from "./user.js";
import { LandSchema } from "./land.js";

export const AnimalParams = Type.Object({
  animal_id: Type.String({
    format: "uuid",
    examples: [
      "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
      "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      "a964bb80-32fc-46d0-b239-e03125535430",
      "62645b97-955e-49ea-891e-24b6ff9180ae",
      "8cfef1a6-77ed-4b17-ab30-176e88b8af37",
    ],
  }),
});

export const Animal = Type.Object({
  id: Type.String({
    format: "uuid",
    examples: ["aaab3d4c-5623-491e-a666-f2e9c1d62cf1", "7eb4d619-6c02-4f02-ab7a-3e302a74eff6"],
  }),
  breed: Type.String({ examples: ["Hereford", "Aberdeen Angus", "Holando", "Braford"] }),
  birth_date: Type.String({ format: "date", examples: ["2021-03-15", "2020-08-22"] }),
  owner_id: Type.String({
    format: "uuid",
    examples: ["de3d6619-7d68-45a6-80df-2d464b6716d4", "100dc01b-7225-4893-b853-0c9bf1804bc4"],
  }),
  land_id: Type.String({
    format: "uuid",
    examples: ["43666c09-a0b0-4b6b-9558-e44b50a25d57", "bf52757b-7a5a-4748-b78f-459471979493"],
  }),
  status: Type.Union(
    [
      Type.Literal("alive"),
      Type.Literal("deceased"),
      Type.Literal("robbed"),
      Type.Literal("lost"),
    ],
    { default: "alive", examples: ["alive", "deceased", "robbed", "lost"] }
  ),
  created_at: Type.String({
    format: "date-time",
    examples: ["2023-01-01T10:00:00Z", "2023-02-15T08:30:00Z"],
  }),
  updated_at: Type.String({ 
    format: "date-time",
    examples: ["2023-05-20T14:15:00Z", "2023-06-10T09:45:00Z"]
  }),
}, {
  examples: [
    {
      id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
      breed: "Hereford",
      birth_date: "2021-03-15",
      owner_id: "de3d6619-7d68-45a6-80df-2d464b6716d4",
      land_id: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
      status: "alive",
      created_at: "2023-01-01T10:00:00Z",
      updated_at: "2023-05-20T14:15:00Z"
    },
    {
      id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      breed: "Aberdeen Angus",
      birth_date: "2020-08-22",
      owner_id: "100dc01b-7225-4893-b853-0c9bf1804bc4",
      land_id: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
      status: "alive",
      created_at: "2023-02-15T08:30:00Z",
      updated_at: "2023-06-10T09:45:00Z"
    }
  ]
});

export const AnimalFilter = Type.Object({
  breed: Type.Optional(
    Type.String({ minLength: 1, examples: ["Hereford", "Aberdeen Angus", "Holando"] })
  ),
  landId: Type.Optional(
    Type.String({
      format: "uuid",
      examples: ["43666c09-a0b0-4b6b-9558-e44b50a25d57", "bf52757b-7a5a-4748-b78f-459471979493"],
    })
  ),
  dateRange: Type.Optional(
    Type.String({
      pattern: "^\\{\\d{4}-\\d{2}-\\d{2},\\d{4}-\\d{2}-\\d{2}\\}$",
      examples: ["{2021-01-01,2022-12-31}", "{2020-06-01,2021-06-01}"],
    })
  ),
}, {
  examples: [
    { breed: "Hereford" },
    { landId: "43666c09-a0b0-4b6b-9558-e44b50a25d57" },
    { dateRange: "{2021-01-01,2022-12-31}" },
    { 
      breed: "Aberdeen Angus", 
      landId: "bf52757b-7a5a-4748-b78f-459471979493",
      dateRange: "{2020-01-01,2021-12-31}"
    }
  ]
});

export const AnimalEventSchema = Type.Object({
  animal_id: Type.String({ 
    format: "uuid",
    examples: ["aaab3d4c-5623-491e-a666-f2e9c1d62cf1", "7eb4d619-6c02-4f02-ab7a-3e302a74eff6"]
  }),
  type: Type.String({
    examples: ["Pesaje", "Vacunación", "Venta"]
  }),
  date: Type.String({ 
    format: "date-time",
    examples: ["2023-09-10T10:00:00Z", "2023-08-15T14:30:00Z"]
  }),
  comments: Type.String({
    examples: ["Pesaje rutinario mensual", "Vacunación antiaftosa", "Venta a frigorífico"]
  }),
}, {
  examples: [
    {
      animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
      type: "Pesaje",
      date: "2023-09-10T10:00:00Z",
      comments: "Pesaje rutinario mensual"
    },
    {
      animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      type: "Vacunación",
      date: "2023-08-15T14:30:00Z",
      comments: "Vacunación antiaftosa"
    }
  ]
});

export const AnimalDetailed = Type.Intersect([
  Animal,
  Type.Object({
    land: Type.Object({
      animal_id: Type.String({ format: "uuid" }),
      name: Type.String(),
    }),
    events: Type.Array(AnimalEventSchema),
  }),
]);


export const AnimalPost = Type.Object({
  breed: Type.String({ examples: ["Hereford", "Aberdeen Angus", "Holando", "Braford"] }),
  birth_date: Type.String({ format: "date", examples: ["2021-03-15", "2020-08-22", "2022-01-05"] }),
  owner_id: Type.String({
    format: "uuid",
    examples: ["de3d6619-7d68-45a6-80df-2d464b6716d4", "100dc01b-7225-4893-b853-0c9bf1804bc4"],
  }),
  land_id: Type.String({
    format: "uuid",
    examples: ["43666c09-a0b0-4b6b-9558-e44b50a25d57", "bf52757b-7a5a-4748-b78f-459471979493"],
  }),
  status: Type.Union(
    [
      Type.Literal("alive"),
      Type.Literal("deceased"),
      Type.Literal("robbed"),
      Type.Literal("lost"),
    ],
    { default: "alive", examples: ["alive", "deceased", "robbed", "lost"] }
  ),
}, {
  examples: [
    {
      breed: "Hereford",
      birth_date: "2021-03-15",
      owner_id: "de3d6619-7d68-45a6-80df-2d464b6716d4",
      land_id: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
      status: "alive"
    },
    {
      breed: "Aberdeen Angus",
      birth_date: "2020-08-22",
      owner_id: "100dc01b-7225-4893-b853-0c9bf1804bc4",
      land_id: "bf52757b-7a5a-4748-b78f-459471979493",
      status: "alive"
    }
  ]
});

export const UpdateAnimalSchema = Type.Object(
  {
    breed: Type.Optional(
      Type.String({ examples: ["Hereford", "Aberdeen Angus", "Holando", "Braford"] })
    ),

    birth_date: Type.Optional(
      Type.String({ format: "date", examples: ["2021-03-15", "2020-08-22"] })
    ),

    owner_id: Type.Optional(
      Type.String({
        format: "uuid",
        examples: ["de3d6619-7d68-45a6-80df-2d464b6716d4", "100dc01b-7225-4893-b853-0c9bf1804bc4"],
      })
    ),

    land_id: Type.Optional(
      Type.String({
        format: "uuid",
        examples: ["43666c09-a0b0-4b6b-9558-e44b50a25d57", "bf52757b-7a5a-4748-b78f-459471979493"],
      })
    ),

    status: Type.Optional(
      Type.Union(
        [
          Type.Literal("alive"),
          Type.Literal("deceased"),
          Type.Literal("robbed"),
          Type.Literal("lost"),
        ],
        { examples: ["alive", "deceased", "robbed", "lost"] }
      )
    ),
  },
  {
    additionalProperties: false,
    minProperties: 1,
    examples: [
      { breed: "Hereford" },
      { status: "deceased" },
      { 
        owner_id: "100dc01b-7225-4893-b853-0c9bf1804bc4",
        land_id: "bf52757b-7a5a-4748-b78f-459471979493"
      }
    ],
  }
);

export const AnimalHistorySchema = Type.Object({
  id: Type.String({
    format: "uuid",
    description: "History record ID",
    examples: ["1bf92745-ffe6-43b8-94ba-57c12dbde3b5", "32bebf98-399e-4e59-ba53-ea7fbcf8a49f"]
  }),
  animal_id: Type.String({
    format: "uuid",
    description: "Which animal was modified",
    examples: ["aaab3d4c-5623-491e-a666-f2e9c1d62cf1", "7eb4d619-6c02-4f02-ab7a-3e302a74eff6"]
  }),
  modified: Type.String({ 
    description: "Field name that changed",
    examples: ["land_id", "status", "owner_id"] 
  }),
  old_value: Type.Optional(Type.String({ 
    description: "Previous value",
    examples: ["43666c09-a0b0-4b6b-9558-e44b50a25d57", "alive", "de3d6619-7d68-45a6-80df-2d464b6716d4"]
  })),
  new_value: Type.Optional(Type.String({ 
    description: "New value",
    examples: ["bf52757b-7a5a-4748-b78f-459471979493", "deceased", "100dc01b-7225-4893-b853-0c9bf1804bc4"]
  })),
  modified_by: Type.String({
    format: "uuid",
    description: "User who made the change",
    examples: ["de3d6619-7d68-45a6-80df-2d464b6716d4", "100dc01b-7225-4893-b853-0c9bf1804bc4"]
  }),
  modification_date: Type.String({
    format: "date-time",
    description: "When the change was recorded",
    examples: ["2023-09-15T10:00:00Z", "2023-08-20T14:30:00Z"]
  }),
}, {
  examples: [
    {
      id: "1bf92745-ffe6-43b8-94ba-57c12dbde3b5",
      animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
      modified: "land_id",
      old_value: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
      new_value: "bf52757b-7a5a-4748-b78f-459471979493",
      modified_by: "de3d6619-7d68-45a6-80df-2d464b6716d4",
      modification_date: "2023-09-15T10:00:00Z"
    },
    {
      id: "32bebf98-399e-4e59-ba53-ea7fbcf8a49f",
      animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      modified: "status",
      old_value: "alive",
      new_value: "deceased",
      modified_by: "100dc01b-7225-4893-b853-0c9bf1804bc4",
      modification_date: "2023-08-20T14:30:00Z"
    }
  ]
});

export const AnimalMovementSchema = Type.Object({
  id: Type.String({ 
    format: "uuid", 
    description: "Movements record ID",
    examples: ["a3028cba-47ba-4ffc-a5cf-0aa620f8c463", "e1f050fc-7f84-4efa-abd6-468de4cb5e0e"] 
  }),
  animal_id: Type.String({
    format: "uuid",
    description: "Which animal was modified",
    examples: ["aaab3d4c-5623-491e-a666-f2e9c1d62cf1", "7eb4d619-6c02-4f02-ab7a-3e302a74eff6"]
  }),
  origin_land_id: Type.String({
    format: "uuid",
    description: "From which land does the animal comes from",
    examples: ["43666c09-a0b0-4b6b-9558-e44b50a25d57", "bf52757b-7a5a-4748-b78f-459471979493"]
  }),
  destiny_land_id: Type.String({
    format: "uuid",
    description: "To which land does the animal goes to",
    examples: ["bf52757b-7a5a-4748-b78f-459471979493", "584630da-cc70-40dd-9599-aa539d788894"]
  }),
  date: Type.String({
    format: "date-time",
    description: "Autogenerated transportation date",
    examples: ["2023-09-15T08:30:00Z", "2023-09-18T10:15:00Z"]
  }),
  details: Type.String({
    description: "Transportation's detail",
    examples: ["Transporte para cambio de potrero", "Movimiento por sequía"]
  }),
}, {
  examples: [
    {
      id: "a3028cba-47ba-4ffc-a5cf-0aa620f8c463",
      animal_id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
      origin_land_id: "43666c09-a0b0-4b6b-9558-e44b50a25d57",
      destiny_land_id: "bf52757b-7a5a-4748-b78f-459471979493",
      date: "2023-09-15T08:30:00Z",
      details: "Transporte para cambio de potrero"
    },
    {
      id: "e1f050fc-7f84-4efa-abd6-468de4cb5e0e",
      animal_id: "7eb4d619-6c02-4f02-ab7a-3e302a74eff6",
      origin_land_id: "bf52757b-7a5a-4748-b78f-459471979493",
      destiny_land_id: "584630da-cc70-40dd-9599-aa539d788894",
      date: "2023-09-18T10:15:00Z",
      details: "Movimiento por sequía"
    }
  ]
});

export const AnimalTagInfo = Type.Object({
  id: Type.String(),
  assignment_date: Type.Date(),
});

export const AnimalWithTag = Type.Object({
  id: Type.String({
    format: "uuid",
    examples: ["0a553254-e85c-4780-8995-34098a788256"],
  }),
  breed: Type.String({ examples: ["Abigar"] }),
  birth_date: Type.String({ format: "date", examples: ["2020-01-01"] }),
  owner_id: Type.String({
    format: "uuid",
    examples: ["56b33cc3-6e43-4aac-99cf-a90bc681d583"],
  }),
  land_id: Type.String({
    format: "uuid",
    examples: ["ca751bd3-3df5-4967-8282-252ac89543ba"],
  }),
  status: Type.Union(
    [
      Type.Literal("alive"),
      Type.Literal("deceased"),
      Type.Literal("robbed"),
      Type.Literal("lost"),
    ],
    { default: "alive", examples: ["alive", "deceased", "robbed", "lost"] }
  ),
  created_at: Type.String({
    format: "date-time",
    examples: ["2020-01-01T00:00:00Z"],
  }),
  updated_at: Type.String({ format: "date-time" }),
  //current_tag: Type.Object(AnimalTagInfo),
});

export const AnimalWithRelationsSchema = Type.Intersect([
  Animal,
  Type.Object({
    owner: Type.Optional(Type.Partial(UserResponseSchema)),
    land: Type.Optional(Type.Partial(LandSchema)),
  }),
]);

export const AnimalHistoryWithUserSchema = Type.Intersect([
  AnimalHistorySchema,
  Type.Object({
    modified_by_id: Type.Optional(
      Type.String({ format: 'uuid', description: 'User ID that made the change' })
    ),
    modified_by_email: Type.Optional(
      Type.String({ format: 'email', description: 'User email' })
    ),
  }),
]);

export const AnimalMovementWithLandsSchema = Type.Intersect([
  AnimalMovementSchema,
  Type.Object({
    origin_land_name: Type.String({ description: 'Name of origin land' }),
    origin_latitude: Type.String({ description: 'Latitude of origin land' }),
    origin_longitude: Type.String({ description: 'Longitude of origin land' }),
    destiny_land_name: Type.String({ description: 'Name of destination land' }),
    destiny_latitude: Type.String({ description: 'Latitude of destination land' }),
    destiny_longitude: Type.String({ description: 'Longitude of destination land' }),
  }),
]);

export type AnimalMovementWithLands = Static<typeof AnimalMovementWithLandsSchema>;
export type AnimalHistoryWithUser = Static<typeof AnimalHistoryWithUserSchema>;
export type AnimalWithRelations = Static<typeof AnimalWithRelationsSchema>;
export type AnimalWithTag = Static<typeof AnimalWithTag>;
export type AnimalHistory = Static<typeof AnimalHistorySchema>;
export type UpdateAnimalType = Static<typeof UpdateAnimalSchema>;
export type AnimalDetailed = Static<typeof AnimalDetailed>;
export type AnimalEvent = Static<typeof AnimalEventSchema>;
export type AnimalFilter = Static<typeof AnimalFilter>;
export type Animal = Static<typeof Animal>;
export type AnimalParams = Static<typeof AnimalParams>;
export type AnimalPost = Static<typeof AnimalPost>;
