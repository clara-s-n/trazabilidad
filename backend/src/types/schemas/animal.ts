import { Static, Type } from "@sinclair/typebox";
import { UserResponseSchema } from "./user.js";
import { LandSchema } from "./land.js";

export const AnimalParams = Type.Object({
  animal_id: Type.String({
    format: "uuid",
    examples: [
      "56b33cc3-6e43-4aac-99cf-a90bc681d583",
      "b2e6d4f3-5c7f-22fd-92e4-1353bd241114",
      "c3d7e5a4-6d80-33fe-a3e5-2464ce352225",
      "d4e8f6b5-7e91-44af-b4f6-3575df463336",
      "2688b6cb-5333-4309-a5d1-53871d342d85",
    ],
  }),
});

export const Animal = Type.Object({
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
});

export const AnimalFilter = Type.Object({
  breed: Type.Optional(
    Type.String({ minLength: 1, examples: ["Abigar", "Aberdeen Angus"] })
  ),
  landId: Type.Optional(
    Type.String({
      format: "uuid",
      examples: ["ca751bd3-3df5-4967-8282-252ac89543ba"],
    })
  ),
  dateRange: Type.Optional(
    Type.String({
      pattern: "^\\{\\d{4}-\\d{2}-\\d{2},\\d{4}-\\d{2}-\\d{2}\\}$",
      examples: ["{2020-01-01,2020-12-31}"],
    })
  ),
});

export const AnimalEventSchema = Type.Object({
  animal_id: Type.String({ format: "uuid" }),
  type: Type.String(),
  date: Type.String({ format: "date-time" }),
  comments: Type.String(),
});

export const AnimalDetailedSchema = Type.Intersect([
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
  breed: Type.String({ examples: ["Abigar"] }),
  birth_date: Type.String({ format: "date", examples: ["2020-01-01"] }),
  owner_id: Type.String({
    format: "uuid",
    examples: ["3600e259-0cc1-491d-9860-aa4cff12155c"],
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
});

export const UpdateAnimalSchema = Type.Object(
  {
    breed: Type.Optional(
      Type.String({ examples: ["Hereford", "Aberdeen Angus"] })
    ),

    birth_date: Type.Optional(
      Type.String({ format: "date", examples: ["2021-06-15"] })
    ),

    owner_id: Type.Optional(
      Type.String({
        format: "uuid",
        examples: ["56b33cc3-6e43-4aac-99cf-a90bc681d583"],
      })
    ),

    land_id: Type.Optional(
      Type.String({
        format: "uuid",
        examples: ["ca751bd3-3df5-4967-8282-252ac89543ba"],
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
        { examples: ["alive", "lost"] }
      )
    ),
  },
  {
    additionalProperties: false,
    minProperties: 1,
    examples: [
      { breed: "Hereford" },
      { status: "lost" },
      { owner_id: "56b33cc3-6e43-4aac-99cf-a90bc681d583" },
    ],
  }
);

export const AnimalHistorySchema = Type.Object({
  id: Type.String({
    format: "uuid",
    description: "History record animal_id",
  }),
  animal_id: Type.String({
    format: "uuid",
    description: "Which animal was modified",
  }),
  modified: Type.String({ description: "Field name that changed" }),
  old_value: Type.Optional(Type.String({ description: "Previous value" })),
  new_value: Type.Optional(Type.String({ description: "New value" })),
  modified_by: Type.String({
    format: "uuid",
    description: "User who made the change",
  }),
  modification_date: Type.String({
    format: "date-time",
    description: "When the change was recorded",
  }),
});

export const AnimalMovementSchema = Type.Object({
  id: Type.String({ format: "uuid", description: "Movements record ID" }),
  animal_id: Type.String({
    format: "uuid",
    description: "Which animal was modified",
  }),
  origin_land_id: Type.String({
    format: "uuid",
    description: "From which land does the animal comes from",
  }),
  destiny_land_id: Type.String({
    format: "uuid",
    description: "To which land does the animal goes to",
  }),
  date: Type.String({
    format: "date-time",
    description: "Autogenerated transportation date",
  }),
  details: Type.String({
    description: "Transportation's detail",
  }),
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
export type AnimalDetailed = Static<typeof AnimalDetailedSchema>;
export type AnimalEvent = Static<typeof AnimalEventSchema>;
export type AnimalFilter = Static<typeof AnimalFilter>;
export type Animal = Static<typeof Animal>;
export type AnimalParams = Static<typeof AnimalParams>;
export type AnimalPost = Static<typeof AnimalPost>;
