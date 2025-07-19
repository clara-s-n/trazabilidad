import {Static, Type} from "@sinclair/typebox";

export const LoginParams = Type.Object({
    email : Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
});

export const UserParams = Type.Object({
    user_id: Type.Integer(),
});

export type LoginType = Static<typeof LoginParams>;
export type UserType = Static<typeof UserParams>;