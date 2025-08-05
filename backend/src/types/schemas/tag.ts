import { Static, Type } from "@sinclair/typebox";
import { Animal } from "./animal.js";

export const TagParams = Type.Object({
  tag_id: Type.String({
    format: "uuid",
    examples: [
      "6ba0b76d-cc01-4d91-8274-6a558b2b7d7b",
      "0f6d8e7e-6e6e-4c9a-ba3e-df063906d786",
    ],
  }),
});

export const TagSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    country_code: Type.String(),
    country_iso: Type.String(),
    ministry: Type.String(),
    tag_number: Type.String(),
    status: Type.Union([
      Type.Literal("active"),
      Type.Literal("inactive"),
      Type.Literal("retired"),
    ]),
  },
  {
    examples: [
      {
        id: "6ba0b76d-cc01-4d91-8274-6a558b2b7d7b",
        country_code: "00014",
        country_iso: "858",
        ministry: "MGAP UY",
        tag_number: "UY00001",
        status: "active",
      },
      {
        id: "0f6d8e7e-6e6e-4c9a-ba3e-df063906d786",
        country_code: "00014",
        country_iso: "858",
        ministry: "MGAP UY",
        tag_number: "UY00002",
        status: "active",
      },
      {
        id: "15779937-6da1-41fb-b747-cb44d4b0004c",
        country_code: "00014",
        country_iso: "858",
        ministry: "MGAP UY",
        tag_number: "UY00004",
        status: "retired",
      },
    ],
  }
);

export const UpdateTagSchema = Type.Object(
  {
    status: Type.Union([
      Type.Literal("active"),
      Type.Literal("inactive"),
      Type.Literal("retired"),
    ]),
  },
  {
    examples: [
      { status: "active" },
      { status: "inactive" },
      { status: "retired" },
    ],
  }
);

export const TagResponse = Type.Intersect(
  [
    TagSchema,
    Type.Object({
      animal: Type.Optional(Type.Partial(Animal)),
    }),
  ],
  {
    examples: [
      {
        id: "6ba0b76d-cc01-4d91-8274-6a558b2b7d7b",
        country_code: "00014",
        country_iso: "858",
        ministry: "MGAP UY",
        tag_number: "UY00001",
        status: "active",
        animal: {
          id: "aaab3d4c-5623-491e-a666-f2e9c1d62cf1",
          breed: "Hereford",
          status: "alive",
        },
      },
      {
        id: "15779937-6da1-41fb-b747-cb44d4b0004c",
        country_code: "00014",
        country_iso: "858",
        ministry: "MGAP UY",
        tag_number: "UY00004",
        status: "retired",
        animal: null,
      },
    ],
  }
);

export type TagResponse = Static<typeof TagResponse>;
export type UpdateTagType = Static<typeof UpdateTagSchema>;
export type Tag = Static<typeof TagSchema>;
export type TagParams = Static<typeof TagParams>;
