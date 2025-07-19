import {Static, Type} from "@sinclair/typebox";

export const VacunacionParams = Type.Object({
    id: Type.String(),
});

export type VacunacionType = Static<typeof VacunacionParams>;
