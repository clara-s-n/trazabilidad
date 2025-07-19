import {Static, Type} from "@sinclair/typebox";

export const LoginParams = Type.Object({
    email : Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
});

export const UsuarioParams = Type.Object({
    id: Type.String(),
});

export type LoginType = Static<typeof LoginParams>;
export type UsuarioType = Static<typeof UsuarioParams>;