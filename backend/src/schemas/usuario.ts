import {Static, Type} from "@sinclair/typebox";

export const Login = Type.Object({
    email : Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
});

export type LoginType = Static<typeof Login>;