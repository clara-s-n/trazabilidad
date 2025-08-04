import { Static, Type } from "@sinclair/typebox";

export const LoginParams = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 })
}, {
  examples: [
    {
      email: 'administrador@example.com',
      password: 'admin123'
    },
    {
      email: 'operador@example.com',
      password: 'operador123'
    },
    {
      email: 'consulta@example.com',
      password: 'consulta123'
    }
  ]

});

export const LoginResponse = Type.Object({
  token: Type.String(),
  user: Type.Object({
    id: Type.String({ format: "uuid" }),
    email: Type.String({ format: "email" }),
    role_id: Type.Integer(),
    created_at: Type.String({ format: "date-time" })
  })
});

export const UserParams = Type.Object({
  user_id: Type.String({ format: "uuid" })
});

export const UserSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  email: Type.String({ format: "email" }),
  password_hash: Type.String(),
  role_id: Type.Integer(),
  created_at: Type.String({ format: "date-time" })
});

export const UserResponseSchema = Type.Omit(UserSchema, ["password_hash"]);
export type UserResponse = Static<typeof UserResponseSchema>;

export const UpdateUserSchema = Type.Object({
  email: Type.Optional(Type.String({ format: "email" })),
  role_id: Type.Optional(Type.Integer())
});
export type UpdateUserType = Static<typeof UpdateUserSchema>;

export const UserPostSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
  repeatPassword: Type.String({ minLength: 6 }),
  role_id: Type.Integer()
});
export type UserPostType = Static<typeof UserPostSchema>;
export type User = Static<typeof UserSchema>;
export type LoginType = Static<typeof LoginParams>;
export type LoginResponseType = Static<typeof LoginResponse>;
export type UserParamsType = Static<typeof UserParams>;