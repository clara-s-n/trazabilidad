import { Static, Type } from "@sinclair/typebox";

export const LoginParams = Type.Object({
    email: Type.String({
        format: "email",
        examples: [
            "administrador@example.com",
            "consulta@example.com",
            "operador@example.com"
        ]
    }),
    password: Type.String({
        minLength: 6,
        examples: ["admin123", "consulta123", "operador123"]
    })
});

export const UserParams = Type.Object({
    user_id: Type.String({
        format: 'uuid',
        examples: [
            '3600e259-0cc1-491d-9860-aa4cff12155c',
            'c4221f6c-9534-4537-8803-eb12ef89468a',
            'debeeeb4-e4a4-4823-8510-b09ff13a735b'
        ]
    }),
});

export const UserSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    email: Type.String({ format: 'email' }),
    password_hash: Type.String(),
    role_id: Type.Number(),
    created_at: Type.String({ format: 'date-time' })
});

export const UpdateUserSchema = Type.Object({
    email: Type.Optional(Type.String({ format: "email" })),
    role_id: Type.Optional(Type.Integer())
});

export const UserPostSchema = Type.Omit(UserSchema, ['id', 'created_at']);

export type UserPostType = Static<typeof UserPostSchema>;
export type User = Static<typeof UserSchema>;
export type LoginType = Static<typeof LoginParams>;
export type UserParamsType = Static<typeof UserParams>;
export type UpdateUserType = Static<typeof UpdateUserSchema>;