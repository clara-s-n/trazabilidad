import {Static, Type} from "@sinclair/typebox";

export const LoginParams = Type.Object({
    email : Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
});

export const UserParams = Type.Object({
    user_id: Type.String({ format: 'uuid' }),
});

export const UserSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
    email: Type.String({ format: 'email' }),
    password_hash: Type.String(),
    rols_id: Type.String({ format: 'uuid' }),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.Optional(Type.String({ format: 'date-time' })),
});

export type User = Static<typeof UserSchema>;
export type LoginType = Static<typeof LoginParams>;
export type UserParamsType = Static<typeof UserParams>;